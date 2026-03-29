import React, { useState } from "react";
import CheckInForm from "./Frontend/components/CheckInForm";
import CheckInList from "./Frontend/components/ChekInList.jsx";

const App = () => {
  const [newCheckIn, setNewCheckIn] = useState(null);

  return (
    <div>
      <h1>DeskFlow – Check-In Management</h1>
      <CheckInForm onNewCheckIn={setNewCheckIn} />
      <CheckInList newCheckIn={newCheckIn} />
    </div>
  );
};

export default App;