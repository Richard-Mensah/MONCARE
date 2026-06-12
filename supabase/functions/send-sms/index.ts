// MONCARE — send-sms edge function
// Triggered by a database webhook whenever an SMS-channel notification row is
// inserted. Looks up the recipient's phone and sends the text via Twilio.
// If Twilio secrets are not set, runs in STUB mode (logs + marks as sent) so
// the end-to-end cancellation flow is testable before Twilio is connected.

import { createClient } from "jsr:@supabase/supabase-js@2"

type NotificationRecord = {
  id: string
  recipient_id: string
  channel: string
  title: string | null
  body: string | null
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json()
    // Supabase webhook payload shape: { type, table, record, old_record }
    const record: NotificationRecord = payload.record ?? payload

    if (!record || record.channel !== "sms") {
      return new Response("ignored", { status: 200 })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: profile } = await supabase
      .from("profiles")
      .select("phone, full_name")
      .eq("id", record.recipient_id)
      .single()

    const phone = profile?.phone as string | undefined
    const body = record.body ?? record.title ?? "MONCARE update"

    const setStatus = (status: "sent" | "failed") =>
      supabase.from("notifications").update({ sms_status: status }).eq("id", record.id)

    if (!phone) {
      console.warn(`No phone for recipient ${record.recipient_id}`)
      await setStatus("failed")
      return new Response("no phone", { status: 200 })
    }

    const sid = Deno.env.get("TWILIO_ACCOUNT_SID")
    const token = Deno.env.get("TWILIO_AUTH_TOKEN")
    const from = Deno.env.get("TWILIO_FROM_NUMBER")

    // STUB mode — no Twilio credentials configured yet.
    if (!sid || !token || !from) {
      console.log(`[SMS STUB] -> ${phone}: ${body}`)
      await setStatus("sent")
      return new Response("stubbed", { status: 200 })
    }

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${sid}:${token}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: phone, From: from, Body: body }),
      }
    )

    if (!res.ok) {
      console.error("Twilio error", res.status, await res.text())
      await setStatus("failed")
      return new Response("twilio failed", { status: 200 })
    }

    await setStatus("sent")
    return new Response("sent", { status: 200 })
  } catch (err) {
    console.error("send-sms error", err)
    return new Response("error", { status: 200 })
  }
})
