import { useCallback, useEffect, useState } from 'react';
import { showConnect } from '@stacks/connect';

export function useConnect(userSession) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setAuthenticated(true);
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setAuthenticated(true);
      setUserData(userSession.loadUserData());
    }
  }, [userSession]);

  const handleOpenAuth = useCallback(() => {
    showConnect({
      appDetails: {
        name: 'Enhanced Content Curation',
        icon: '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setAuthenticated(true);
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  }, [userSession]);

  const handleSignOut = useCallback(() => {
    userSession.signUserOut();
    setAuthenticated(false);
    setUserData(null);
  }, [userSession]);

  return { handleOpenAuth, handleSignOut, authenticated, userData };
}
