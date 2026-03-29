const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Helper to log results
const log = (operation, response) => {
  console.log(`\n=== ${operation} ===`);
  console.log(response.data);
};

const testCRUD = async () => {
  try {
    // ----------- CHECKINS -----------
    // CREATE
    let res = await axios.post(`${BASE_URL}/checkins`, {
      resident_id: 1,
      clerk_id: 1,
      check_in_time: new Date().toISOString(),
    });
    const checkInId = res.data.id;
    log("CheckIn CREATE", res);

    // READ
    res = await axios.get(`${BASE_URL}/checkins`);
    log("CheckIn READ", res);

    // UPDATE
    res = await axios.put(`${BASE_URL}/checkins/${checkInId}`, {
      check_out_time: new Date().toISOString(),
    });
    log("CheckIn UPDATE", res);

    // DELETE
    res = await axios.delete(`${BASE_URL}/checkins/${checkInId}`);
    log("CheckIn DELETE", res);

    // ----------- ITEMS -----------
    // CREATE
    res = await axios.post(`${BASE_URL}/items`, {
      item_name: "Basketball",
      borrower_id: 1,
      checkout_time: new Date().toISOString(),
    });
    const itemId = res.data.id;
    log("Item CREATE", res);

    // READ
    res = await axios.get(`${BASE_URL}/items`);
    log("Item READ", res);

    // UPDATE
    res = await axios.put(`${BASE_URL}/items/${itemId}`, {
      borrower_id: 1,
      return_time: new Date().toISOString(),
    });
    log("Item UPDATE", res);

    // DELETE
    res = await axios.delete(`${BASE_URL}/items/${itemId}`);
    log("Item DELETE", res);

    // ----------- VIOLATIONS -----------
    // CREATE
    res = await axios.post(`${BASE_URL}/violations`, {
      resident_id: 1,
      clerk_id: 1,
      description: "Noise complaint",
      date: new Date().toISOString(),
    });
    const violationId = res.data.id;
    log("Violation CREATE", res);

    // READ
    res = await axios.get(`${BASE_URL}/violations`);
    log("Violation READ", res);

    // UPDATE
    res = await axios.put(`${BASE_URL}/violations/${violationId}`, {
      description: "Late night noise complaint",
      date: new Date().toISOString(),
    });
    log("Violation UPDATE", res);

    // DELETE
    res = await axios.delete(`${BASE_URL}/violations/${violationId}`);
    log("Violation DELETE", res);

    console.log("\nAll CRUD tests completed successfully!");
  } catch (err) {
    console.error("Error during CRUD test:", err.response ? err.response.data : err.message);
  }
};

testCRUD();