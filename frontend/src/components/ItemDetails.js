import React, { useState } from 'react';
import { useConnect } from '../hooks/useConnect';
import { voteItem, rewardItem, flagItem } from '../utils/contractInteractions';
import '../styles/ItemDetails.css';

const ItemDetails = ({ item, onClose }) => {
  const { userSession } = useConnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = async (vote) => {
    setLoading(true);
    setError(null);
    try {
      await voteItem(userSession, item.itemIdentifier, vote);
      // Update local state or refetch items
    } catch (err) {
      setError('Failed to vote. Please try again.');
    }
    setLoading(false);
  };

  const handleReward = async (amount) => {
    setLoading(true);
    setError(null);
    try {
      await rewardItem(userSession, item.itemIdentifier, amount);
      // Update local state or refetch items
    } catch (err) {
      setError('Failed to reward. Please try again.');
    }
    setLoading(false);
  };

  const handleFlag = async () => {
    setLoading(true);
    setError(null);
    try {
      await flagItem(userSession, item.itemIdentifier);
      // Update local state or refetch items
    } catch (err) {
      setError('Failed to flag item. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="item-details">
      <button className="close-button" onClick={onClose}>&times;</button>
      <h2>{item.headline}</h2>
      <p className="topic">Topic: {item.topic}</p>
      <a href={item.hyperlink} target="_blank" rel="noopener noreferrer" className="item-link">View Content</a>
      <div className="item-stats">
        <span>Appraisals: {item.appraisals}</span>
        <span>Gratuities: {item.gratuities}</span>
        <span>Flags: {item.flags}</span>
      </div>
      <div className="item-actions">
        <button onClick={() => handleVote(1)} disabled={loading}>Upvote</button>
        <button onClick={() => handleVote(-1)} disabled={loading}>Downvote</button>
        <button onClick={() => handleReward(10)} disabled={loading}>Reward (10 STX)</button>
        <button onClick={handleFlag} disabled={loading}>Flag</button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p>Processing...</p>}
    </div>
  );
};

export default ItemDetails;
