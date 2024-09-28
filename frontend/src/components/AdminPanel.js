import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConnect } from '../hooks/useConnect';
import { adjustSubmissionCharge, introduceTopic, expungeItem } from '../utils/contractInteractions';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const { userSession } = useConnect();
  const { register: registerCharge, handleSubmit: handleSubmitCharge } = useForm();
  const { register: registerTopic, handleSubmit: handleSubmitTopic } = useForm();
  const { register: registerExpunge, handleSubmit: handleSubmitExpunge } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onAdjustCharge = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await adjustSubmissionCharge(userSession, data.newCharge);
      // Update successful
    } catch (err) {
      setError('Failed to adjust submission charge. Please try again.');
    }
    setLoading(false);
  };

  const onAddTopic = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await introduceTopic(userSession, data.newTopic);
      // Update successful
    } catch (err) {
      setError('Failed to add new topic. Please try again.');
    }
    setLoading(false);
  };

  const onExpungeItem = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await expungeItem(userSession, data.itemToExpunge);
      // Update successful
    } catch (err) {
      setError('Failed to expunge item. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmitCharge(onAdjustCharge)}>
        <input
          {...registerCharge('newCharge', { required: true, min: 1 })}
          type="number"
          placeholder="New submission charge"
        />
        <button type="submit" disabled={loading}>Adjust Charge</button>
      </form>
      <form onSubmit={handleSubmitTopic(onAddTopic)}>
        <input
          {...registerTopic('newTopic', { required: true, maxLength: 20 })}
          placeholder="New topic"
        />
        <button type="submit" disabled={loading}>Add Topic</button>
      </form>
      <form onSubmit={handleSubmitExpunge(onExpungeItem)}>
        <input
          {...registerExpunge('itemToExpunge', { required: true, min: 1 })}
          type="number"
          placeholder="Item ID to expunge"
        />
        <button type="submit" disabled={loading}>Expunge Item</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading && <p>Processing...</p>}
    </div>
  );
};

export default AdminPanel;
