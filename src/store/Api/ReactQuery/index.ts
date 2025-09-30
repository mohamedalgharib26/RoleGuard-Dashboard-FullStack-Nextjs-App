import type { Post } from "../../Zustand";
import { ApiResponse } from "@/app/api/todos/route";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// type Role = "User" | "Admin" | "Moderator";
export const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch("http://localhost:3000/api/users");
  if (!data.ok) throw new Error("Network error");
  const res = data.json();
  return res;
};
export const fetchPosts = async (): Promise<Post[]> => {
  const data = await fetch("http://localhost:3000/posts");
  if (!data.ok) throw new Error("Error Come True");
  const res = data.json();
  return res;
};
export const fetchProducts = async (): Promise<Post[]> => {
  const data = await fetch("http://localhost:3000/api/products");
  if (!data.ok) throw new Error("Error Come True");
  const res = data.json();
  return res;
};
export const fetchTodos = async (page: number): Promise<ApiResponse> => {
  const data = await fetch(
    `http://localhost:3000/api/todos?page=${page}&pageSize=5`
  );
  if (!data.ok) throw new Error("Error Come True");
  const res = await data.json();
  console.log(res);
  return res;
};

// Mutation
export const PostData = async <TBody, TResponse>(
  url: string,
  body?: TBody,
  options?: RequestInit
): Promise<TResponse> => {
  const res = await fetch(url, {
    method: options?.method || "POST",
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
