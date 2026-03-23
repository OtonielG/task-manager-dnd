import type { Column, Id } from "../types";
import TaskContainer from "./TaskContainer";

type ProjectsAreaProps = {
  columns: Column[];
  deleteColumn: (id: Id) => void;
};

export default function ProjectsArea({
  columns,
  deleteColumn,
}: ProjectsAreaProps) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-6 sm:px-6">
      <section
        aria-labelledby="board-heading"
        className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6"
      >
        <div className="mb-5 flex flex-col gap-1">
          <h1
            id="board-heading"
            className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            Project Board
          </h1>
          <p className="text-sm text-slate-600">
            Organize your workflow by creating and managing columns.
          </p>
        </div>

        <ul
          aria-label="Project columns"
          className="flex flex-1 list-none items-start gap-4 overflow-x-auto overflow-y-hidden p-2"
        >
          {columns.map((column) => (
            <li key={column.id} className="shrink-0">
              <TaskContainer column={column} deleteColumn={deleteColumn} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
