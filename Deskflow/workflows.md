# DeskFlow User Workflows

**Deliverable 1 Features Tested**

## 1. User Authentication

### Registration Workflow
1. Navigate to `http://localhost:5173/register`
2. Enter **Name** (min 3 chars), **Password** (min 6 chars)
3. Select **Role** (Clerk, RA, or default User)
4. Click **Register**
5. Expected: Password hashed with bcrypt, user stored in DB, redirect to Dashboard, token in localStorage

### Login Workflow
1. Navigate to `http://localhost:5173/` 
2. Enter **Name**, **Password**
3. Click **Login**
4. Expected: JWT token issued, user in localStorage, redirect Dashboard
5. Error handling: Invalid creds show error message

### Logout Workflow
1. Dashboard → Navbar → **Logout**
2. Expected: Storage cleared, redirect Login

## 2. Desk Check-In Management

### Create Check-In
1. Login as Clerk (e.g. create user ID 25 via testCRUD)
2. Dashboard → CheckInForm
3. Enter **Resident ID** (e.g. 9), **Clerk ID** (25)
4. Click **Check In**
5. Expected: POST /api/checkins, success alert, list updates

### View Check-Ins
1. Dashboard → CheckInList
2. Expected: GET /api/checkins shows all with times

### Checkout/Update
(Via PUT /api/checkins/:id in code)

## 3. Admin CRUD Operations (Tested via script)

**Run `node src/Backend/tests/testCRUD.js` with server running:**

- **Users**: CREATE Alice Clerk/RA, READ/UPDATE/DELETE
- **Residents**: CREATE John/Jane, READ/UPDATE
- **CheckIns**: Full CRUD with FKs
- **Items**: Borrow Basketball, UPDATE return
- **Violations**: Noise complaint, UPDATE

All pass ✅ Data persists in deskflow.db

## 4. Testing Summary

- **Backend**: Express CRUD routes (open, no auth), SQLite OK
- **Frontend**: React Router auth flow, Tailwind UI, Axios API
- **Issues Fixed**: Server started for tests
- **Unit Tests**: Added checkins.test.js (run `npm test` in Backend)
- **Stack**: Backend port 5000, Frontend Vite (run `npm run dev` root)

**Submission Ready**: Push GitHub, print this to PDF for Canvas.

**Tested Date**: April 2026 (DB timestamps)

