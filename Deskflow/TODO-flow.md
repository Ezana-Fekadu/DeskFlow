# Complete DeskFlow Flow TODO

**User Flow**: Check-in resident → Option visitor/item → Display active (resident/visitor/item) with timers (expire midnight - for items) & (visitors can't stay checked in for longer than 6 hours (between 9 am and 9 pm or vice versa) unless there is no school the next day).

**Plan**:
1. **Combine forms**: CheckInForm → Stepper/modal for resident + visitor + item.
2. **Active lists**: Show timers (check-in time → midnight countdown).
3. **Auto-expire**: Items expire midnight (cron job or check).
4. **Count-down**: Visitors have 6 hours, unless no class the next day
5. **Backend validation**: Item checkout time < midnight.

**Files**:
- Dashboard.jsx: Combined form.
- ItemList.jsx/VisitorList.jsx: Add timers.
- Backend items.js/visitors.js: Add expire logic.

Progress: 0/4

