"use client";

import { TodoWithUser } from "../api/todos/route";

type SingleTodoProps = {
  item: TodoWithUser;
};

const SingleTodo = ({ item }: SingleTodoProps) => {
  const { id, title, user } = item;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
        {/* ID */}
        <h4 className="text-xs text-gray-400 break-all">{id}</h4>

        {/* Title */}
        <h2 className="mt-2 text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
          {title}
        </h2>

        {/* User Info */}
        <div className="mt-4 space-y-1">
          <p className="text-gray-700">
            <span className="font-medium text-indigo-500">User:</span>{" "}
            {user?.name ?? "No User"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-indigo-500">Role:</span>{" "}
            {user?.role ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
