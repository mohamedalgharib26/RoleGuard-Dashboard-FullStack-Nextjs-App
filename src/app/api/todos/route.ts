import prisma from "@/lib/prisma";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { Prisma, Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import { paginate, PaginationResult } from "../../../lib/pagination";

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

export async function GET(
  req: Request
): Promise<NextResponse<PaginationResult<TodoWithUser> | ErrorResponse>> {
  try {
    const result = await paginate<TodoWithUser>(req, prisma.todo, {
      withPagination: true,
    });
    return NextResponse.json<PaginationResult<TodoWithUser>>(result);
  } catch (err: unknown) {
    return handleError(err);
  }
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
