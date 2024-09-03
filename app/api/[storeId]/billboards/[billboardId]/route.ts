import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET handler for fetching a specific billboard
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return NextResponse.json(
        { error: "Billboard ID is required" },
        { status: 400 }
      );
    }

    const billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });

    if (!billboard) {
      return NextResponse.json(
        { error: "Billboard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.error(`[BILLBOARD_GET] Error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH handler for updating a specific billboard
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!params.billboardId) {
      return NextResponse.json(
        { error: "Billboard ID is required" },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json({ error: "Store ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label || typeof label !== "string") {
      return NextResponse.json(
        { error: "Label is required and must be a string" },
        { status: 400 }
      );
    }

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Image URL is required and must be a string" },
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedBillboard = await prismadb.billboard.update({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(updatedBillboard, { status: 200 });
  } catch (error) {
    console.error(`[BILLBOARD_PATCH] Error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE handler for deleting a specific billboard
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!params.billboardId) {
      return NextResponse.json(
        { error: "Billboard ID is required" },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json({ error: "Store ID is required" }, { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const deletedBillboard = await prismadb.billboard.delete({
      where: { id: params.billboardId },
    });

    return NextResponse.json(deletedBillboard, { status: 200 });
  } catch (error) {
    console.error(`[BILLBOARD_DELETE] Error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
