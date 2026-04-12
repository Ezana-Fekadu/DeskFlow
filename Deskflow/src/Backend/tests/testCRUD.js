const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Helper to log results
const log = (operation, response) => {
  console.log(`\n=== ${operation} ===`);
  console.log(response.data);
};

const testCRUD = async () => {
  try {
    // ----------- USERS CRUD -----------
    let res = await axios.post(`${BASE_URL}/users`, { name: "Alice Clerk", role: "Clerk" });
    const clerkId = res.data.id;
    log("User CREATE (Clerk)", res);

    res = await axios.post(`${BASE_URL}/users`, { name: "Bob RA", role: "RA" });
    const raId = res.data.id;
    log("User CREATE (RA)", res);

    res = await axios.get(`${BASE_URL}/users`);
    log("User READ ALL", res);

    res = await axios.put(`${BASE_URL}/users/${clerkId}`, { name: "Alice Clerk Updated", role: "Clerk" });
    log("User UPDATE", res);

    res = await axios.get(`${BASE_URL}/users/${clerkId}`);
    log("User READ SINGLE", res);

    // ----------- RESIDENTS CRUD -----------
    res = await axios.post(`${BASE_URL}/residents`, { name: "John Doe", room: "101A" });
    const resident1Id = res.data.id;
    log("Resident CREATE (John Doe)", res);

    res = await axios.post(`${BASE_URL}/residents`, { name: "Jane Smith", room: "102B" });
    const resident2Id = res.data.id;
    log("Resident CREATE (Jane Smith)", res);

    res = await axios.get(`${BASE_URL}/residents`);
    log("Resident READ ALL", res);

    res = await axios.put(`${BASE_URL}/residents/${resident1Id}`, { name: "John Doe Updated", room: "101A" });
    log("Resident UPDATE", res);

    res = await axios.get(`${BASE_URL}/residents/${resident1Id}`);
    log("Resident READ SINGLE", res);

    // ----------- CHECKINS CRUD -----------
    res = await axios.post(`${BASE_URL}/checkins`, {
      resident_id: resident1Id,
      clerk_id: clerkId,
      check_in_time: new Date().toISOString(),
    });
    const checkInId = res.data.id;
    log("CheckIn CREATE", res);

    res = await axios.get(`${BASE_URL}/checkins`);
    log("CheckIn READ", res);

    res = await axios.put(`${BASE_URL}/checkins/${checkInId}`, {
      check_out_time: new Date().toISOString(),
    });
    log("CheckIn UPDATE", res);

    res = await axios.delete(`${BASE_URL}/checkins/${checkInId}`);
    log("CheckIn DELETE", res);

    // ----------- ITEMS CRUD -----------
    res = await axios.post(`${BASE_URL}/items`, {
      item_name: "Basketball",
      borrower_id: resident1Id,
      checkout_time: new Date().toISOString(),
    });
    const itemId = res.data.id;
    log("Item CREATE", res);

    res = await axios.get(`${BASE_URL}/items`);
    log("Item READ", res);

    res = await axios.put(`${BASE_URL}/items/${itemId}`, {
      borrower_id: resident2Id,
      return_time: new Date().toISOString(),
    });
    log("Item UPDATE", res);

    res = await axios.delete(`${BASE_URL}/items/${itemId}`);
    log("Item DELETE", res);

    // ----------- VIOLATIONS CRUD -----------
    res = await axios.post(`${BASE_URL}/violations`, {
      resident_id: resident2Id,
      clerk_id: raId,
      description: "Noise complaint",
      date: new Date().toISOString(),
    });
    const violationId = res.data.id;
    log("Violation CREATE", res);

    res = await axios.get(`${BASE_URL}/violations`);
    log("Violation READ", res);

    res = await axios.put(`${BASE_URL}/violations/${violationId}`, {
      description: "Late night noise complaint",
      date: new Date().toISOString(),
    });
    log("Violation UPDATE", res);

    res = await axios.delete(`${BASE_URL}/violations/${violationId}`);
    log("Violation DELETE", res);

    // ----------- VISITORS CRUD -----------
    res = await axios.post(`${BASE_URL}/visitors`, {
      name: "Guest Visitor",
      host_resident_id: resident1Id,
      time_in: new Date().toISOString(),
    });
    const visitorId = res.data.id;
    log("Visitor CREATE", res);

    res = await axios.get(`${BASE_URL}/visitors`);
    log("Visitor READ", res);

    res = await axios.put(`${BASE_URL}/visitors/${visitorId}`, {
      time_out: new Date().toISOString(),
    });
    log("Visitor UPDATE", res);

    res = await axios.delete(`${BASE_URL}/visitors/${visitorId}`);
    log("Visitor DELETE", res);

    console.log("\nAll CRUD tests (including Visitors) completed successfully!");

  } catch (err) {
    console.error("Error during CRUD test:", err.response ? err.response.data : err.message);
  }
};

testCRUD();
