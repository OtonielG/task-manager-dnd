import type { Id, Task } from "../types";
import DeleteIcon from "../assets/deleteIcon.svg?react";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return (
      <li className="flex h-24 w-full shrink-0 rounded-xl border border-violet-200 bg-white p-3 shadow-sm">
        <label htmlFor={`task-${task.id}`} className="sr-only">
          Edit task content
        </label>
        <textarea
          autoFocus
          id={`task-${task.id}`}
          defaultValue={task.content}
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-200"
          placeholder="Write your task..."
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </li>
    );
  }

  return (
    <li
      onClick={toggleEditMode}
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
