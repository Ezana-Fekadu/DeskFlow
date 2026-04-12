import { useState } from 'react';
import api from '../api';

const VisitorForm = ({ onNewVisitor, hostResidentId: propHostId }) => {
  const [name, setName] = useState('');
  const [hostResidentId, setHostResidentId] = useState(propHostId || '');
  const [clerkId, setClerkId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !hostResidentId || !clerkId) {
      setError('All fields required');
      return;
    }

    try {
      const response = await api.post('/visitors', {
        name,
        host_resident_id: parseInt(hostResidentId),
        time_in: new Date().toISOString(),
        clerk_id: parseInt(clerkId),
      });
      onNewVisitor(response.data);
      setSuccess('Visitor logged successfully!');
      setError('');
      setName('');
      setHostResidentId('');
      setClerkId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error logging visitor');
      setSuccess('');
    }
  };

  return (
    <div className="page-card">
      <h3>Log Visitor</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Visitor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="input-field"
          placeholder="Host Resident ID"
          value={hostResidentId}
          onChange={(e) => setHostResidentId(e.target.value)}
          required
        />
        <input
          type="number"
          className="input-field"
          placeholder="Clerk ID"
          value={clerkId}
          onChange={(e) => setClerkId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Log Visitor</button>
      </form>
    </div>
  );
};

export default VisitorForm;
