import { useMemo, useState } from "react";
import type { Column, Id } from "../types";
import TaskContainer from "./TaskContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { SortValue } from "../App";

type SortOption = {
  label: string;
  value: SortValue;
};

const sortOptions: SortOption[] = [
  { label: "Manual", value: "manual" },
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

type ProjectsAreaProps = {
  columns: Column[];
  deleteColumn: (id: Id) => void;
  handleChange: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (columnId: Id, taskId: Id) => void;
  updateTask: (columnId: Id, taskId: Id, content: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
};

export default function ProjectsArea({
  columns,
  deleteColumn,
  handleChange,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  sort,
  onSortChange,
}: ProjectsAreaProps) {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    setActiveColumn(null);

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    handleChange(activeColumnId, overColumnId);
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-6 sm:px-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <section
          aria-labelledby="board-heading"
          className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6"
        >
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex flex-col gap-1">
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
            <div className="">
              <ul className="flex flex-wrap md:flex-nowrap justify-start md:justify-end gap-2">
                {sortOptions.map((option) => (
                  <li key={option.label}>
                    <button
                      type="button"
                      onClick={() => onSortChange(option.value)}
                      className={`w-fit flex text-nowrap items-center gap-2 rounded-full border px-4 py-1 text-sm transition-colors cursor-pointer ${
                        sort === option.value
                          ? "border-violet-500 bg-violet-500 text-white"
                          : "border-violet-500/30 bg-violet-500/10 text-violet-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <SortableContext
            items={columnsId}
            strategy={horizontalListSortingStrategy}
          >
            <ul
              aria-label="Project columns"
              className="flex flex-1 list-none items-start gap-4 overflow-x-auto overflow-y-hidden p-2"
            >
              {columns.map((column) => (
                <li key={column.id} className="shrink-0">
                  <TaskContainer
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                </li>
              ))}
            </ul>
          </SortableContext>
        </section>

        <DragOverlay>
          {activeColumn ? (
            <TaskContainer
              column={activeColumn}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
