import { NextApiRequest } from 'next';
import prismadb from "@/lib/prismadb";
var midtransClient = require("midtrans-client");
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SECRET_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS
});

export async function POST(req: NextApiRequest) {
    const { order_id, transaction_status, payment_type } = req.body; // get order_id, transaction_status, and payment_type from req.body

    try {
        // Verify the signature of the request
        const signature = headers().get('signature-key') as string;
        const isValidSignature = apiClient.isSignValid(signature, req.body);

        if (!isValidSignature) {
            throw new Error('Invalid signature');
        }

        // Handle the notification
        await prismadb.order.update({
            where: {
                id: order_id
            },
            data: {
                isPaid: transaction_status,
            }
        });

        // Send a 200 OK response to confirm the notification was received
        return new NextResponse(null, { status: 200 });

    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }
};