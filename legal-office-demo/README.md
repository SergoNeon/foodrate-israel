# TM Legal Office — Practice Management Demo

A bilingual English/Russian browser prototype for a law-office practice management system.

## Included in the demo

- Executive dashboard with matters, appointments, billable time and outstanding invoices
- Client CRM and intake pipeline
- Case / matter management
- Calendar for court dates, meetings and filing deadlines
- Task workflow / Kanban
- Document library concept with versions and matter links
- Time tracking and billing overview in ILS
- Contacts directory
- Reports area
- Security/settings concept with role-based access, audit log and 2FA readiness
- English / Russian UI switch; Russian can later be removed without restructuring the application
- Responsive layout for desktop and mobile
- Demo client creation stored only in browser localStorage

## Important

This branch is a UI/UX prototype using sample data only. It is **not** yet appropriate for real privileged client information. A production version should add authenticated users, encrypted database/storage, backups, audit logging, permission enforcement, document access controls, retention policies and a reviewed security/privacy model.

## Files

- `index.html` — application shell and demo screens
- `styles.css` — responsive professional legal-office design
- `app.js` — navigation, bilingual UI, calendar and local demo interactions

## Production roadmap

1. Authentication + 2FA + user roles (Partner / Lawyer / Assistant / Accountant)
2. PostgreSQL database with clients, matters, tasks, events, notes, contacts and billing
3. Secure document storage with versions and access logs
4. Real matter timeline and court/deadline reminders
5. Email/calendar integrations
6. Time entry, expenses, invoice generation and payment status
7. Conflict-check workflow and engagement-letter templates
8. Full audit trail, backup/restore and security hardening
9. Optional Hebrew localization alongside English
10. Remove Russian localization when the office no longer needs it

## Demo branch

`demo/legal-office-suite`
