import prisma from "@/lib/prisma";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { Prisma, Todo } from "@prisma/client";
import { NextResponse } from "next/server";

export type TodoWithUser = Prisma.TodoGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        role: true;
      };
    };
  };
}>;

export type ApiResponse = {
  data: TodoWithUser[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = Number(url.searchParams.get("pageSize")) || 10;
  const total = await prisma.todo.count();
  const totalPages = Math.ceil(total / pageSize);

  const data: TodoWithUser[] = await prisma.todo.findMany({
    include: {
      user: {
        select: {
          name: true,
          role: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: { id: "desc" },
  });

  return NextResponse.json<ApiResponse>({
    data,
    page,
    pageSize,
    total,
    totalPages,
  });
}

export async function POST(
  request: Request
): Promise<NextResponse<Todo | ErrorResponse>> {
  try {
    const body: Prisma.TodoCreateInput = await request.json();
    const data = await prisma.todo.create({
      data: body,
    });
    return NextResponse.json<Todo>(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
