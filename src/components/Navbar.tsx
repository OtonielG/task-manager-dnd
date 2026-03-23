import LogoTask from "../assets/logoTask.svg?react";
import SearchIcon from "../assets/searchIcon.svg?react";

export default function Navbar() {
  return (
    <header className="p-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2">
            <LogoTask className="bg-violet-500 size-10 text-lg rounded-xl" />
            <div className="flex gap-1 items-center text-xl">
              <span className="font-bold">Task</span>
              <span>Space</span>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2 px-3 border-2 border-violet-400 rounded-full">
            <SearchIcon className="size-4 cursor-pointer" />
            <input
              type="text"
              className="border-none outline-none text-gray-500 placeholder-gray-500 flex-1"
              placeholder="Search..."
            />
          </div>
        </div>
        <form action="">
          <button className="bg-violet-500 px-5 py-2 text-white rounded-3xl h-10 cursor-pointer">
            Add New Project
          </button>
        </form>
      </nav>
    </header>
  );
}
