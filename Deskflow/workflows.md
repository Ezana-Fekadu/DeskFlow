# DeskFlow User Workflows
*Professional Documentation for Deliverable 1*

## 1. User Registration & Login
1. Navigate to DeskFlow app
2. Click "Create new account" → Register
3. Enter Name/Password → Submit
4. Login with credentials → Dashboard

## 2. Resident Check-in Flow
1. Dashboard → Enter Resident ID (e.g. 1)
2. Click "Check In"
3. **Modal**: "Visitors with Resident?"
   - Skip → CheckInList updates
   - Log Visitor: Name/Host/Clerk → VisitorList timer
4. **Optional**: ItemList → Checkout item → Timer starts

## 3. Active Lists (Real-time)
- **CheckInList**: Active residents (checkout pending)
- **VisitorList**: Today's visitors w/ midnight countdown
- **ItemList**: Checked out items w/ midnight countdown

## 4. Logout
1. Navbar → "Logout" → Redirect login

## 5. Admin (RA/Clerk Roles)
- All flows same (role-based UI later)

**Timers**: Midnight auto-expire (FE logic).

**Demo**: http://localhost:5173

**GitHub**: github.com/username/DeskFlow

---

*Print/Save as PDF for Canvas submission*
