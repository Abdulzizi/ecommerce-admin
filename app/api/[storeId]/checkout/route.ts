import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// [IMPORT ERROR (IMPORT NOT DETECTED)]
// import Midtrans from "midtrans-client"
var Midtrans = require("midtrans-client");

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    headers: corsHeaders
  });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    //? quantity fix 1 karena tidak ada sistem stok
    const quantity = 1;
    const { id, productName, price } = await req.json(); // Destructure the data object
    console.log(`ID : ${id}, PRODUCT : ${productName}, PRICE : ${price}`);

    // Check if required fields are present
    if (!id || !productName || !price) {
      return new NextResponse("ID, Product Name, and Price are required", { status: 400 });
    }

    // Membuat order
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
      },
    });

    // Membuat orderItems
    await Promise.all(id.map(async (productId: string) => {
      const orderItem = await prismadb.orderItem.create({
        data: {
          orderId: order.id,
          productId: productId,
        },
      });
      return orderItem;
    }));    

    // Calculate gross amount
    const grossAmount = price.reduce((acc: number, curr: string) => acc + Number(curr), 0);

    // Create item details
    const itemDetails = {
      name: productName.join(', '), // Join product names into a single string
      price: grossAmount, // Use gross amount as price
      quantity: quantity
    };

    // Create transaction details
    const transactionDetails = {
      order_id: order.id, //? diambil dari DB, Tergenerate ketika menekan tombol checkout
      gross_amount: grossAmount
    };

    const parameter = {
      item_details: itemDetails,
      transaction_details: transactionDetails
    };

    const token = await snap.createTransactionRedirectUrl(parameter)
    console.log(`Midtrans token : ${token}`);

    return NextResponse.json({ token }, { headers: corsHeaders })
  } catch (error) {
    console.log('[CHECKOUT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};