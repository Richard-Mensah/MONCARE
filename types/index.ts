// Shared domain types — mirror the Supabase schema. Never define these inline.

export type Role = "coordinator" | "worker" | "care_home"
export type ShiftStatus =
  | "open"
  | "assigned"
  | "confirmed"
  | "completed"
  | "cancelled"
export type AssignmentStatus = "assigned" | "confirmed" | "cancelled"
export type ClaimStatus = "pending" | "approved" | "rejected" | "withdrawn"
export type TimesheetStatus = "open" | "submitted" | "approved" | "rejected"
export type NotificationChannel = "in_app" | "sms"

export type Profile = {
  id: string
  role: Role
  full_name: string | null
  phone: string | null
  home_postcode: string | null
  care_home_id: string | null
  created_at: string
}

export type CareHome = {
  id: string
  name: string
  address: string | null
  postcode: string | null
  region: string | null
  contact_name: string | null
  contact_phone: string | null
  created_at: string
}

export type StaffDetails = {
  id: string
  roles: string[]
  certifications: string[]
  active: boolean
  notes: string | null
  created_at: string
}

export type Availability = {
  id: string
  worker_id: string
  weekday: number | null
  specific_date: string | null
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
}

export type Shift = {
  id: string
  care_home_id: string
  shift_date: string
  start_time: string
  end_time: string
  role_required: string | null
  pay_rate: number | null
  status: ShiftStatus
  notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ShiftAssignment = {
  id: string
  shift_id: string
  worker_id: string
  assigned_by: string | null
  status: AssignmentStatus
  confirmed_at: string | null
  created_at: string
}

export type ShiftCancellation = {
  id: string
  shift_id: string
  cancelled_by: string | null
  cancelled_by_role: string | null
  reason: string | null
  taken_by_permanent: boolean
  created_at: string
}

export type Notification = {
  id: string
  recipient_id: string
  type: string
  channel: NotificationChannel
  title: string | null
  body: string | null
  shift_id: string | null
  read_at: string | null
  sms_status: "pending" | "sent" | "failed" | null
  created_at: string
}

export type Timesheet = {
  id: string
  shift_id: string
  worker_id: string
  clock_in: string | null
  clock_out: string | null
  hours: number | null
  status: TimesheetStatus
  approved_by: string | null
  created_at: string
}

// A shift joined with its care home + assigned worker, for list views.
export type ShiftWithRelations = Shift & {
  care_home: CareHome | null
  assignment: (ShiftAssignment & { worker: Profile | null }) | null
}
