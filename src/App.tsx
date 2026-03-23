import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectsArea from "./components/ProjectsArea";
import type { Column, Id } from "./types";
import { arrayMove } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";

function App() {
  const [columns, setColumns] = useState<Column[]>([
    { id: crypto.randomUUID(), title: "List 1" },
  ]);

  const [search, setSearch] = useState("");

  function createColumn() {
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title: `List ${columns.length + 1}`,
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

  function handleChange(activeId: UniqueIdentifier, overId: UniqueIdentifier) {
    setColumns((prev) => {
      const activeColumnIndex = prev.findIndex((col) => col.id === activeId);
      const overColumnIndex = prev.findIndex((col) => col.id === overId);
      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });
  }

  const filteredColumns = useMemo(() => {
    return columns.filter((column) =>
      column.title.toLowerCase().includes(search.toLowerCase().trim()),
    );
  }, [columns, search]);

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
        />
      </div>
    </div>
  );
}

export default App;
