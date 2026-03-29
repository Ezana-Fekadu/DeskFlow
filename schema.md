# DeskFlow SQLite Database Schema

## Tables

### 1. Users (desk clerks / RAs)
- id INTEGER PRIMARY KEY AUTOINCREMENT
- name TEXT NOT NULL
- role TEXT NOT NULL  -- e.g., 'clerk', 'RA', 'admin'

### 2. Residents
- id INTEGER PRIMARY KEY AUTOINCREMENT
- name TEXT NOT NULL
- room TEXT NOT NULL
- email TEXT

### 3. CheckIns
- id INTEGER PRIMARY KEY AUTOINCREMENT
- resident_id INTEGER NOT NULL
- clerk_id INTEGER NOT NULL
- check_in_time DATETIME
- check_out_time DATETIME
- FOREIGN KEY (resident_id) REFERENCES Residents(id)
- FOREIGN KEY (clerk_id) REFERENCES Users(id)

### 4. Items
- id INTEGER PRIMARY KEY AUTOINCREMENT
- item_name TEXT NOT NULL
- borrower_id INTEGER
- checkout_time DATETIME
- return_time DATETIME
- FOREIGN KEY (borrower_id) REFERENCES Residents(id)

### 5. Violations
- id INTEGER PRIMARY KEY AUTOINCREMENT
- resident_id INTEGER NOT NULL
- clerk_id INTEGER NOT NULL
- description TEXT
- date DATETIME
- FOREIGN KEY (resident_id) REFERENCES Residents(id)
- FOREIGN KEY (clerk_id) REFERENCES Users(id)