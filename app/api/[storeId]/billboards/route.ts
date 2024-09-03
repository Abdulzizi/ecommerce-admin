import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json({ error: "Store Id is required" }, { status: 400 });
    }

    // Parse and validate request body
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label || typeof label !== "string") {
      return NextResponse.json({ error: "Label is required and must be a string" }, { status: 400 });
    }

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Image URL is required and must be a string" }, { status: 400 });
    }

    // Check if the store exists and belongs to the user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Create a new billboard entry
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard, { status: 201 });
  } catch (error) {
    console.error(`[BILLBOARDS_POST] Error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json({ error: "Store Id is required" }, { status: 400 });
    }

    // Fetch all billboards associated with the store
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    console.error(`[BILLBOARDS_GET] Error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}