import { Todo } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Pagination = {
  page?: number;
  limit?: number;
};
export const TodoApi = createApi({
  reducerPath: "TodosApi",
  tagTypes: ["todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], Pagination>({
      query: ({ page, limit }) =>
        page && limit ? `todos?_page=${page}&_limit=${limit}` : "todos",
      providesTags: ["todos"],
      // transformResponse: (res: Todo[]) => res.slice(0, 10),
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id: string) => `todos/${id}`,
      providesTags: (_result, _error, id) => [{ type: "todos", id }],
    }),
  }),
});

export const { useGetAllTodosQuery, useGetTodoByIdQuery } = TodoApi;
