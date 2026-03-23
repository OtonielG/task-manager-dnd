import { useState } from "react";
import Navbar from "./components/Navbar";
import ProjectsArea from "./components/ProjectsArea";
import type { Column, Id } from "./types";

function App() {
  const [columns, setColumns] = useState<Column[]>([]);

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

  return (
    <div className="flex h-dvh w-full flex-col bg-slate-50">
      <Navbar onAddProject={createColumn} />
      <div className="flex-1 flex items-center">
        <ProjectsArea columns={columns} deleteColumn={deleteColumn} />
      </div>
    </div>
  );
}

export default App;
