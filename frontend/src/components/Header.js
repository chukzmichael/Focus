import React from 'react';
import '../styles/Header.css';

const Header = ({ authenticated, handleOpenAuth, handleSignOut }) => {
  return (
    <header className="header">
      <h1>Content Curation</h1>
      <nav>
        {authenticated ? (
          <button onClick={handleSignOut} className="auth-button">Sign Out</button>
        ) : (
          <button onClick={handleOpenAuth} className="auth-button">Connect Wallet</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
