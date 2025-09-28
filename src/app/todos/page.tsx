"use client";
import { useEffect, useState } from "react";
import type { Todo } from "./Todo";
import SingleTodo from "./Todo";
import { useGetAllTodosQuery } from "../../store/Api";

const TodoList = () => {
  const [pageNumber, SetPage] = useState(1);
  const [lastValidData, setLastValidData] = useState<Todo[]>([]);

  const { data: items } = useGetAllTodosQuery({
    page: pageNumber,
    limit: 10,
  });
  useEffect(() => {
    if (items && items.length > 0) {
      setLastValidData(items);
    }
  }, [items]);

  return (
    <div>
      {lastValidData &&
        lastValidData.map((item: Todo) => {
          return <SingleTodo id={item.id} title={item.title} key={item.id} />;
        })}
      {pageNumber != 1 && (
        <button
          className="bg-yellow-400 text-black px-3 py-1 rounded mx-4 hover:bg-yellow-600 cursor-pointer"
          onClick={() => SetPage((prev) => prev - 1)}
        >
          Prev
        </button>
      )}
      {items && items.length > 0 && (
        <button
          className="bg-green-600 text-white px-3 py-1 rounded mx-4 hover:bg-green-800 cursor-pointer"
          onClick={() => SetPage((prev) => prev + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default TodoList;
