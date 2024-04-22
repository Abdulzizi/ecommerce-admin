import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

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

    const quantity = 1;
    const { id, productName, price } = await req.json();

    if (!id) {
      return new NextResponse("ID required", { status: 400 })
    }

    if (!productName) {
      return new NextResponse("Product Name required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price required", { status: 400 })
    }

    // create order
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: id.map((productId: string) => ({
            product: {
              connect: {
                id: productId
              }
            }
          }))
        }
      }
    });

    const order_id = await prismadb.orderItem.findFirst({
      where: {
        orderId: order.id
      }
    });

    let parameter = {
      item_details: {
        name: productName,
        price: Number(price),
        quantity: quantity
      },
      transaction_details: {
        order_id: order_id?.id,
        gross_amount: Number(price) * Number(quantity)
      }
    };

    const token = await snap.createTransactionToken(parameter)
    console.log(token);

    return NextResponse.json({ token }, { headers: corsHeaders })
  } catch (error) {
    console.log('[CHECKOUT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};