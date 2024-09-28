import React, { useState, useEffect } from 'react';
import { Connect } from '@stacks/connect-react';
import { UserSession, AppConfig } from '@stacks/auth';
import Header from './components/Header';
import SubmitItem from './components/SubmitItem';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import AdminPanel from './components/AdminPanel';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { useConnect } from './hooks/useConnect';
import { fetchItems } from './utils/contractInteractions';
import './styles/App.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function App() {
  const { handleOpenAuth, handleSignOut, authenticated, userData } = useConnect(userSession);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugMode, setDebugMode] = useState(false); // Add this line

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        console.log('Fetching items...');
        const fetchedItems = await fetchItems();
        console.log('Fetched items:', fetchedItems);
        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (authenticated) {
      loadItems();
    } else {
      setLoading(false); // Set loading to false if not authenticated
    }
  }, [authenticated]);

  // Add this function
  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
    setLoading(false); // Force loading to false when debug mode is toggled
  };

  const isAdmin = userData?.profile?.isAdmin || false;

  if (loading && !debugMode) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'Enhanced Content Curation',
          icon: '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <div className="app">
        <ErrorBoundary>
          <Header
            authenticated={authenticated}
            handleOpenAuth={handleOpenAuth}
            handleSignOut={handleSignOut}
          />
          <main>
            {authenticated ? (
              <>
                <SubmitItem onSubmit={(newItem) => setItems([...items, newItem])} />
                <ItemList items={items} onSelectItem={setSelectedItem} />
                {selectedItem && (
                  <ItemDetails
                    item={selectedItem}
                    onVote={(id, vote) => {/* Implement voting logic */}}
                    onReward={(id, amount) => {/* Implement rewarding logic */}}
                    onFlag={(id) => {/* Implement flagging logic */}}
                  />
                )}
                {isAdmin && <AdminPanel />}
              </>
            ) : (
              <div className="welcome">
                <h2>Welcome to Content Curation</h2>
                <p>Please connect your wallet to start curating content.</p>
              </div>
            )}
          </main>
        </ErrorBoundary>
      </div>
    </Connect>
  );
}

export default App;
