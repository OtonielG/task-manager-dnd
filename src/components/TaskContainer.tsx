import type { Column, Id } from "../types";
import DeleteIcon from "../assets/deleteIcon.svg?react";
import PlusIcon from "../assets/plusIcon.svg?react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (columnId: Id, taskId: Id) => void;
  updateTask: (columnId: Id, taskId: Id, content: string) => void;
}

export default function TaskContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
}: Props) {
  const [editTitle, setEditTitle] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editTitle,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <article
        ref={setNodeRef}
        style={style}
        className="flex h-125 max-h-125 w-80 flex-col rounded-2xl border-2 border-violet-400 bg-white shadow-sm"
      ></article>
    );
  }

  function formatCreatedAt(createdAt: number) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(createdAt));
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="flex h-125 max-h-125 w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <header
        {...attributes}
        {...listeners}
        className="flex items-center justify-between w-full rounded-t-2xl border-b border-violet-100 bg-violet-50 px-4 py-3 active:cursor-grab"
      >
        <div className="flex-1 flex min-w-0 items-center gap-3">
          <span
            aria-label={`${column.tasks.length} tasks`}
            className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
          >
            {column.tasks.length}
          </span>

          <h2
            onClick={() => setEditTitle(true)}
            className="flex-1 truncate text-base font-semibold text-slate-900 cursor-text"
          >
            {!editTitle ? (
              column.title || "Untitled list"
            ) : (
              <input
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onBlur={() => {
                  if (!column.title.trim()) {
                    updateColumn(column.id, "Untitled list");
                  }
                  setEditTitle(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;

                  if (!column.title.trim()) {
                    updateColumn(column.id, "Untitled list");
                  }

                  setEditTitle(false);
                }}
                autoFocus
                className="w-full rounded-md border border-violet-200 bg-white px-2 py-1 text-base font-semibold text-slate-900 outline-none focus:border-violet-400"
              />
            )}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => deleteColumn(column.id)}
          aria-label={`Delete ${column.title}`}
          className="flex size-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-violet-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 cursor-pointer"
        >
          <DeleteIcon className="size-5" aria-hidden="true" />
        </button>
      </header>

      <section
        aria-label={`Tasks in ${column.title}`}
        className="flex flex-1 min-h-0 px-4 py-4"
      >
        <ul className="flex w-full flex-1 min-h-0 flex-col gap-2 overflow-y-auto overflow-x-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 p-1 text-sm">
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={(taskId) => deleteTask(column.id, taskId)}
              updateTask={(taskId, content) =>
                updateTask(column.id, taskId, content)
              }
            />
          ))}
        </ul>
      </section>

      <footer className="flex justify-between items-center border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
        <button
          onClick={() => createTask(column.id)}
          className="h-full flex items-center gap-2 hover:text-violet-600 cursor-pointer"
        >
          <PlusIcon className="size-8" />
          <span>Add Task</span>
        </button>
        <span>{formatCreatedAt(column.createdAt)}</span>
      </footer>
    </article>
  );
}
