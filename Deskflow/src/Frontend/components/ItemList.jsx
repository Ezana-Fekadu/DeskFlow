import { useCallback, useEffect, useState } from 'react';
import api from '../api';

const ItemList = ({ newItem }) => {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (err) {
      console.error('Fetch items error', err);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [newItem, fetchItems]);

  return (
    <div className="page-card">
      <h3>Checked Out Items</h3>
      <div className="list">
        {items.map((item) => {
          if (item.return_time) return null;
          const checkout = new Date(item.checkout_time);
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          const remaining = Math.max(0, midnight - checkout) / 1000 / 60;
          return (
            <div key={item.id} className="list-item">
              <span>{item.item_name} - Resident {item.borrower_id}</span>
              <span>{remaining.toFixed(0)} min left until midnight</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
