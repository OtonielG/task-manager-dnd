import type { Column, Id } from "../types";
import DeleteIcon from "../assets/deleteIcon.svg?react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

export default function TaskContainer({
  column,
  deleteColumn,
  updateColumn,
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
        className="flex h-96 max-h-96 w-80 flex-col rounded-2xl border-2 border-violet-400 bg-white shadow-sm"
      ></article>
    );
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="flex h-96 max-h-96 w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <header
        {...attributes}
        {...listeners}
        className="flex items-center justify-between w-full rounded-t-2xl border-b border-violet-100 bg-violet-50 px-4 py-3 active:cursor-grab"
      >
        <div className="flex-1 flex min-w-0 items-center gap-3">
          <span
            aria-label="0 tasks"
            className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
          >
            0
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
          className="flex size-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-violet-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 cursor-pointer"
        >
          <DeleteIcon className="size-5" aria-hidden="true" />
        </button>
      </header>

      <section
        aria-label={`Tasks in ${column.title}`}
        className="flex flex-1 px-4 py-4"
      >
        <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
          Content
        </div>
      </section>

      <footer className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
        Footer
      </footer>
    </article>
  );
}
