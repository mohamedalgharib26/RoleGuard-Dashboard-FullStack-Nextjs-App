/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/handleError.ts
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export interface ErrorResponse {
  message: string;
}
export function handleError(error: unknown) {
  console.error(error);
  // Prisma Client Known Error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      // record not found
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }
    if (error.code === "P2002") {
      // record not found
      const field = (error.meta as any)?.target?.[0] || "Field";

      return NextResponse.json(
        { message: `${field} already exists` },
        { status: 400 }
      );
    }

    // أي error P2002 آخر من Prisma
    return NextResponse.json(
      { message: error.message, code: error.code },
      { status: 500 }
    );
  }

  // أي error عادي
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  // fallback generic
  return NextResponse.json(
    { message: "Unknown error occurred" },
    { status: 500 }
  );
}
