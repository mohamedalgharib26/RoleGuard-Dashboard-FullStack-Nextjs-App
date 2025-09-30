import { Product } from "../../../generated/prisma";
// app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all Product
export async function GET() {
  const products: Product[] = await prisma.products.findMany();
  if (!products) throw Error("No Products Found !! ");
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await prisma.products.create({
    data: body,
  });
  return NextResponse.json(data);
}
