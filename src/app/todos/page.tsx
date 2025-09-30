"use client";
import { useState } from "react";
import SingleTodo from "./Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi, PostData, User } from "@/store/Api/ReactQuery";
import { TodoWithUser } from "../api/todos/route";
import { SubmitHandler, useForm } from "react-hook-form";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";
import Loader from "@/Components/Loader";
import Pagination from "@/Components/Pagination";

const TodoList = () => {
  const [pageNumber, SetPage] = useState(1);
  type AddTodoFormData = {
    id: string;
    title: string;
    userId: string;
  };
  const { data: items, isLoading } = useQuery({
    queryKey: ["Todos", pageNumber],
    queryFn: () =>
      fetchApi<TodoWithUser>("todos", {
        page: pageNumber,
        pageSize: 10,
        withPagination: true,
      }),
    placeholderData: (prev) => prev,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchApi<User>("users"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodoFormData>();

  const qc = useQueryClient();
  const addTodo = useMutation({
    mutationFn: async (body: Prisma.TodoCreateInput) =>
      PostData<Prisma.TodoCreateInput, Prisma.TodoCreateInput>(
        "http://localhost:3000/api/todos",
        body,
        {
          method: "POST",
        }
      ),
    onSuccess: async () => {
      toast.success("Todo  Added successfully ...");
      await qc.invalidateQueries();
    },
    onError: () => toast.error("Error .. "),
  });

  const onSubmit: SubmitHandler<AddTodoFormData> = async (formData) => {
    const dataObject = {
      ...formData,
    } as Prisma.TodoCreateInput;
    addTodo.mutate(dataObject);
  };

  return (
    <>
      {isLoading || addTodo.isPending ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader loading={true} />
        </div>
      ) : (
        <div>
          {items && (
            <Pagination<TodoWithUser>
              withPagination
              onPageChange={SetPage}
              page={items.pagination?.page ?? 1}
              totalPages={items.pagination?.totalPages ?? 1}
              items={items}
            >
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {items?.data.map((item) => (
                  <SingleTodo item={item} key={item.id} />
                ))}
              </div>
            </Pagination>
          )}
          <div className=" bg-gray-900 px-6 py-2 sm:py-32 lg:px-8 rounded-4xl mt-5 w-2xl mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-16 max-w-xl sm:mt-20"
            >
              <div className="flex flex-wrap justify-center gap-3 items-start">
                {/* Todo Input + Error */}
                <div className="flex flex-col flex-1 min-w-[200px]">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-white"
                  >
                    Todo
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter Todo title"
                    {...register("title", {
                      required: "Todo title is required",
                    })}
                    className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                {/* Users */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Users
                  </label>
                  <select
                    {...register("userId")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-shadow-black bg-indigo-400"
                  >
                    <option value="">Select a User</option>
                    {users &&
                      users.map((user: User) => (
                        <option key={user.id} value={user.id}>
                          {user.name} - {user.role}
                        </option>
                      ))}
                  </select>
                  {errors.userId && (
                    <p className="text-red-500 text-sm">
                      {errors.userId.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <div className="flex-shrink-0 mt-6 sm:mt-8">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold hover:bg-indigo-400"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
