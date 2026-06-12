# MONCARE — Staffing Platform

Live shift allocation and **instant cancellation alerts** for a healthcare staffing agency.
When a care home cancels a shift (or a MONCARE coordinator cancels on their behalf), the
assigned worker and all coordinators are notified immediately by **SMS + live in-app banner**
— so nobody travels to a cancelled shift. Replaces ad-hoc WhatsApp shift management.

## Stack
- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Supabase** — Postgres + Auth + Realtime + Edge Functions (project region: London / eu-west-2)
- SMS via **Twilio** (edge function; runs in stub/log mode until credentials are set)

## Roles
| Role | Purpose |
|------|---------|
| **coordinator** | MONCARE office — create/assign/cancel shifts, manage staff & care homes, approve timesheets, payroll export |
| **worker** | Care staff — My Shifts, confirm, claim open shifts, set availability, clock in/out |
| **care_home** | Client (e.g. MEDYGG) — view their rota, cancel shifts |

The **first user to sign up automatically becomes the coordinator**. Others default to `worker`;
the coordinator sets care-home users' role and links them to a home.

## Local development
```bash
npm install
npm run dev        # http://localhost:3000
```
Environment variables live in `.env.local` (Supabase URL + anon key already set).

Sign in with your email — you'll receive a magic link. (Supabase's built-in mailer is
rate-limited; configure SMTP for production.)

## Project structure
```
app/
  (app)/              # authenticated pages (shared AppHeader + nav)
    dashboard, shifts, staff, care-homes, reports   # coordinator
    my-shifts, open-shifts, availability, timesheets # worker
    rota                                             # care home
    notifications
  auth/confirm        # magic-link callback
  api/payroll/export  # payroll CSV
lib/
  supabase/           # browser + server clients
  data/               # read queries
  actions/            # "use server" mutations
  auth.ts             # getUserProfile / requireRole
components/           # ui/, layout/, features/
supabase/
  functions/send-sms/ # Twilio edge function
```

## Database
All schema is applied as Supabase migrations (`01`–`10`): tables with RLS, the
`cancel_shift()` RPC (the critical flow), notification triggers, open-shift claiming,
and the `dispatch_sms` trigger (pg_net → edge function). See `AGENTS.md` for details.

## Going live
1. **Twilio**: set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` as
   Supabase Edge Function secrets to enable real SMS (and later, phone-OTP login).
2. **Deploy**: push to Vercel; set the same `NEXT_PUBLIC_*` env vars, and add the
   production URL to Supabase Auth redirect URLs.
3. **Email**: configure a custom SMTP provider in Supabase Auth for reliable magic links.
