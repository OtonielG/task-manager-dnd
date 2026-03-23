import type { Id, Task } from "../types";
import DeleteIcon from "../assets/deleteIcon.svg?react";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

export default function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <li
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="flex justify-between items-center shrink-0 w-full h-14 px-4 bg-white rounded-md hover:border-2 hover:border-violet-400"
    >
      <span className="text-slate-500">{task.content}</span>
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="hover:bg-violet-100 size-8 flex justify-center items-center rounded-full cursor-pointer opacity-50 hover:opacity-100"
        >
          <DeleteIcon className="size-5" />
        </button>
      )}
    </li>
  );
}
