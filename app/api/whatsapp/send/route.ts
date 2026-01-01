import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";

export async function POST(request: NextRequest) {
    try {
        const { to, message } = await request.json();

        if (!to || !message) {
            return NextResponse.json(
                { error: "Missing 'to' or 'message' parameter" },
                { status: 400 }
            );
        }

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_WHATSAPP_NUMBER;

        if (!accountSid || !authToken || !from) {
            return NextResponse.json(
                { error: "Twilio credentials not configured" },
                { status: 500 }
            );
        }

        const client = new Twilio(accountSid, authToken);

        const result = await client.messages.create({
            from: `whatsapp:${from}`,
            to: `whatsapp:${to}`,
            body: message,
        });

        return NextResponse.json({
            success: true,
            messageSid: result.sid,
            status: result.status,
        });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

