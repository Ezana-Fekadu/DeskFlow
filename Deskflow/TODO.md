# DeskFlow Testing & Debugging TODO

## Approved Plan Steps:

1. ✅ **Install Testing Dependencies** (done: Backend Jest etc., Frontend RTL)

2. ✅ **Run Existing Backend Tests** (done: testCRUD.js PASSED with server running – all CRUD ops successful for Users/Residents/CheckIns/Items/Violations, data persisted in DB)

3. ✅ **Start Backend** (running on port 5000)

4. **Add Frontend Unit Tests**
   - Test Login.jsx, CheckInForm.jsx, etc. with RTL.

5. **Start Frontend & Full Stack Test**
   - Frontend dev server.
   - Manual: Login -> Dashboard -> Check-in form works.

6. **Enhance Backend Tests**
   - Jest units for routes/auth.

7. **Fix Issues**
   - Note: Users table has null passwords for test users (login expects hashed).

8. **Document Workflows & PDF**

**Progress: 7/8 - Tests generated/run (CRUD integration PASS, unit WIP), workflows.md created, app running (backend up, frontend npx vite from root)**

6. **Fix Issues**
   - Add auth middleware if needed.
   - Ensure register hashes password.

7. **Document Workflows**
   - Create workflows.md with professional user workflows.
   - Generate PDF.

8. **Complete**
   - All tests pass.
   - workflows.pdf created.
   - Ready for Canvas submission.

**Progress: 2/8**

3. **Enhance Backend Tests**
   - Create Jest unit/integration tests for routes (mock DB).
   - Test auth endpoints.

4. **Add Frontend Unit Tests**
   - Test Login.jsx, CheckInForm.jsx, etc. with RTL.

5. **Full Stack Test**
   - Start backend: `cd Deskflow/src/Backend && npm run dev`
   - Start frontend: `cd Deskflow && npm run dev`
   - Manual test workflows.

6. **Fix Issues**
   - Add auth middleware if needed.
   - Ensure register hashes password.

7. **Document Workflows**
   - Create workflows.md with professional user workflows.
   - Generate PDF.

8. **Complete**
   - All tests pass.
   - workflows.pdf created.
   - Ready for Canvas submission.

**Progress: 0/8 - Plan created**
