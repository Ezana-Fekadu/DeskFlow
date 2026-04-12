const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db_name = path.join(__dirname, "deskflow.db");
const db = new sqlite3.Database(db_name, (err) => {
    if (err) console.error("DB Connection Error:", err.message);
    else console.log("Connected to SQLite database.");
});

// Create tables if not exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Residents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        room TEXT NOT NULL,
        email TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS CheckIns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_id INTEGER NOT NULL,
        clerk_id INTEGER NOT NULL,
        check_in_time DATETIME,
        check_out_time DATETIME,
        FOREIGN KEY(resident_id) REFERENCES Residents(id),
        FOREIGN KEY(clerk_id) REFERENCES Users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        borrower_id INTEGER,
        checkout_time DATETIME,
        return_time DATETIME,
        FOREIGN KEY(borrower_id) REFERENCES Residents(id)
    )`);

db.run(`CREATE TABLE IF NOT EXISTS Violations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_id INTEGER NOT NULL,
        clerk_id INTEGER NOT NULL,
        description TEXT,
        date DATETIME,
        FOREIGN KEY(resident_id) REFERENCES Residents(id),
        FOREIGN KEY(clerk_id) REFERENCES Users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        host_resident_id INTEGER,
        time_in DATETIME,
        time_out DATETIME,
        clerk_id INTEGER NOT NULL,
        FOREIGN KEY(host_resident_id) REFERENCES Residents(id),
        FOREIGN KEY(clerk_id) REFERENCES Users(id)
    )`);

    db.run(`ALTER TABLE Residents ADD COLUMN status TEXT DEFAULT 'active'`);

    db.run(`CREATE TABLE IF NOT EXISTS Visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        host_resident_id INTEGER,
        time_in DATETIME,
        time_out DATETIME,
        clerk_id INTEGER NOT NULL,
        FOREIGN KEY(host_resident_id) REFERENCES Residents(id),
        FOREIGN KEY(clerk_id) REFERENCES Users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Audit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        table_name TEXT NOT NULL,
        record_id INTEGER,
        old_data TEXT,
        new_data TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )`);
});

module.exports = db;