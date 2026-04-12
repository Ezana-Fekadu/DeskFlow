import { useCallback, useEffect, useState } from 'react';
import api from '../api';

const VisitorList = ({ newVisitor }) => {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = useCallback(async () => {
    try {
      const response = await api.get('/visitors');
      setVisitors(response.data);
    } catch (err) {
      console.error('Fetch visitors error', err);
    }
  }, []);

  useEffect(() => {
    fetchVisitors();
  }, [newVisitor, fetchVisitors]);

  return (
    <div className="page-card">
      <h3>Today's Visitors</h3>
      <div className="list">
        {visitors.map((visitor) => {
          if (visitor.time_out) return null;
          const checkin = new Date(visitor.time_in);
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          const remaining = Math.max(0, midnight - checkin) / 1000 / 60;
          return (
            <div key={visitor.id} className="list-item">
              <span>{visitor.name} (Host: {visitor.host_resident_id})</span>
              <span>{remaining.toFixed(0)} min left until midnight</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisitorList;
