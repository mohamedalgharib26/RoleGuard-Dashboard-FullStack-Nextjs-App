import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ massage: "Product Deleted ..." });
}
