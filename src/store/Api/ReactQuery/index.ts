import { PaginationResult } from "@/lib/pagination";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// type Role = "User" | "Admin" | "Moderator";
// export const fetchUsers = async (): Promise<User[]> => {
//   const data = await fetch("http://localhost:3000/api/users");
//   if (!data.ok) throw new Error("Network error");
//   const res = data.json();
//   return res;
// };
// export const fetchPosts = async (): Promise<Post[]> => {
//   const data = await fetch("http://localhost:3000/posts");
//   if (!data.ok) throw new Error("Error Come True");
//   const res = data.json();
//   return res;
// };
// export const fetchProducts = async (): Promise<Post[]> => {
//   const data = await fetch("http://localhost:3000/api/products");
//   if (!data.ok) throw new Error("Error Come True");
//   const res = data.json();
//   return res;
// };
// export const fetchTodos = async (
//   page: number,
//   pageSize?: number
// ): Promise<PaginationResult<TodoWithUser>> => {
//   const data = await fetch(
//     `http://localhost:3000/api/todos?page=${page}&pageSize=${10}`
//   );
//   if (!data.ok) throw new Error("Error Come True");
//   const res = await data.json();
//   return res;
// };

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  withPagination?: boolean;
};

// ✅ Overloads
export async function fetchApi<T>(
  url: string,
  opt: PaginationOptions & { withPagination: true }
): Promise<PaginationResult<T>>;

export async function fetchApi<T>(
  url: string,
  opt?: PaginationOptions & { withPagination?: false }
): Promise<T[]>;

// ✅ Implementation
export async function fetchApi<T>(
  url: string,
  opt?: PaginationOptions
): Promise<PaginationResult<T> | T[]> {
  if (opt?.withPagination) {
    url = `http://localhost:3000/api/${url}?page=${opt.page ?? 1}&pageSize=${
      opt.pageSize ?? 10
    }`;
  } else {
    url = `http://localhost:3000/api/${url}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error Come True");
  const data = await res.json();

  return opt?.withPagination ? (data as PaginationResult<T>) : (data as T[]);
}

// Mutation
export const PostData = async <TBody, TResponse>(
  url: string,
  body?: TBody,
  options?: RequestInit
): Promise<TResponse> => {
  const res = await fetch(url, {
    method: options?.method || "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as TResponse;
};
