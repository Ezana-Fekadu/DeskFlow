import { useState } from 'react';
import api from '../api';

const ItemForm = ({ onNewItem }) => {
  const [itemName, setItemName] = useState('');
  const [borrowerId, setBorrowerId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/items', {
        item_name: itemName,
        borrower_id: parseInt(borrowerId),
        checkout_time: new Date().toISOString(),
      });
      onNewItem(response.data);
      setSuccess('Item checked out!');
      setError('');
      setItemName('');
      setBorrowerId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="page-card">
      <h3>Item Checkout</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form-grid" onSubmit={handleCheckout}>
        <input
          type="text"
          className="input-field"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="number"
          className="input-field"
          placeholder="Borrower Resident ID"
          value={borrowerId}
          onChange={(e) => setBorrowerId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Checkout</button>
      </form>
    </div>
  );
};

export default ItemForm;
