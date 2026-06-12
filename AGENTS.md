<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MONCARE platform

Staffing platform for MONCARE (healthcare agency) supplying zero-hour care staff to
care homes (MEDYGG Criccieth/Porthmadog/Rhyl, etc.). Core purpose: when a care home
cancels a shift, the assigned worker and MONCARE are notified **instantly** (SMS +
live in-app), so nobody travels to a cancelled shift. Also moves shift comms off WhatsApp.

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 (CSS `@theme`, no config file).
- Supabase project `moncare` (id `webygekkyvkpmqkhdmwn`, region eu-west-2/London): Postgres + Auth + Realtime + Edge Functions.
- Follow `nextjs-llm-instructions.md` conventions (components < 200 lines, `cn()`, `@/` alias, types in `types/`).
- Next 16 renamed `middleware` → `proxy` (`proxy.ts`). Auth is email magic-link; phone OTP pending Twilio.
- Do NOT use `next/font/google` (build env can't fetch Google Fonts) — system font stack only.

## Three roles (`profiles.role`)
- `coordinator` — MONCARE office: creates/assigns/cancels shifts, manages staff & homes.
- `worker` — care staff: My Shifts, confirm, (later) claim open shifts, availability, timesheets.
- `care_home` — client (linked via `profiles.care_home_id`): views their rota, cancels shifts.

## Key DB objects (migrations 01–07, applied via Supabase MCP)
- Tables: care_homes, profiles, staff_details, availability, shifts, shift_assignments,
  shift_cancellations, shift_claims, timesheets, notifications. RLS on all.
- RLS helpers (SECURITY DEFINER): `my_role()`, `is_coordinator()`, `my_care_home()`.
- `cancel_shift(shift_id, reason, taken_by_permanent)` RPC — the critical flow: authorizes
  coordinator/owning care home, cancels shift + assignment, audits, fans out notifications.
- Triggers: `on_assignment_created` (notify worker), `sync_shift_on_assignment_update`
  (worker confirm), `dispatch_sms` (pg_net → `send-sms` edge function on SMS notifications).
- Realtime publication includes shifts, shift_assignments, notifications.
- Edge function `send-sms`: Twilio sender, STUB mode (logs + marks sent) until Twilio secrets set.

## Conventions here
- Read queries in `lib/data/*`, mutations in `lib/actions/*` (`"use server"`).
- Authenticated pages live under `app/(app)/` (shared layout = AppHeader + Side/BottomNav).
- `requireRole([...])` / `getUserProfile()` in `lib/auth.ts` gate pages.
