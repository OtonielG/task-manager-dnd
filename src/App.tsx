import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectsArea from "./components/ProjectsArea";
import type { Column, Id } from "./types";
import { arrayMove } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";

export type SortValue = "manual" | "az" | "za" | "newest" | "oldest";

const STORAGE_KEY = "project-board-columns";

function App() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEY);

    if (savedColumns) {
      return JSON.parse(savedColumns);
    }

    return [
      {
        id: crypto.randomUUID(),
        title: "List 1",
        createdAt: Date.now(),
        tasks: [],
      },
    ];
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("manual");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  function createColumn() {
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title: `List ${columns.length + 1}`,
      createdAt: Date.now(),
      tasks: [],
    };

    setColumns((prev) => [...prev, newColumn]);
  }

  function deleteColumn(id: Id) {
    setColumns((prev) => prev.filter((column) => column.id !== id));
  }

  function updateColumn(id: Id, title: string) {
    setColumns((prev) => {
      const newColumns = prev.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });

      return newColumns;
    });
  }

  function createTask(columnId: Id) {
    setColumns((prev) =>
      prev.map((column) => {
        if (column.id !== columnId) return column;

        return {
          ...column,
          tasks: [
            ...column.tasks,
            {
              id: crypto.randomUUID(),
              content: `Task ${column.tasks.length + 1}`,
            },
          ],
        };
      }),
    );
  }

  function deleteTask(columnId: Id, taskId: Id) {
    setColumns((prev) =>
      prev.map((column) => {
        if (column.id !== columnId) return column;

        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }),
    );
  }

  function updateTask(columnId: Id, taskId: Id, content: string) {
    setColumns((prev) =>
      prev.map((column) => {
        if (column.id !== columnId) return column;

        return {
          ...column,
          tasks: column.tasks.map((task) => {
            if (task.id !== taskId) return task;
            return { ...task, content };
          }),
        };
      }),
    );
  }

  function handleChange(activeId: UniqueIdentifier, overId: UniqueIdentifier) {
    setColumns((prev) => {
      const activeColumnIndex = prev.findIndex((col) => col.id === activeId);
      const overColumnIndex = prev.findIndex((col) => col.id === overId);
      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });
  }

  const filteredColumns = useMemo(() => {
    const filtered = columns.filter((column) =>
      column.title.toLowerCase().includes(search.toLowerCase().trim()),
    );

    if (sort === "manual") return filtered;

    const sorted = [...filtered];

    if (sort === "az") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "za") {
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sort === "newest") {
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (sort === "oldest") {
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    }

    return filtered;
  }, [columns, search, sort]);

  return (
    <div className="flex h-dvh w-full flex-col bg-slate-50">
      <Navbar
        onAddProject={createColumn}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="flex flex-1">
        <ProjectsArea
          columns={filteredColumns}
          deleteColumn={deleteColumn}
          handleChange={handleChange}
          updateColumn={updateColumn}
          createTask={createTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
    </div>
  );
}

export default App;
