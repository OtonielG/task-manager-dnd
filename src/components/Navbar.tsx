import LogoTask from "../assets/logoTask.svg?react";
import SearchIcon from "../assets/searchIcon.svg?react";

type NavbarProps = {
  onAddProject: () => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Navbar({
  onAddProject,
  search,
  onSearchChange,
}: NavbarProps) {
  return (
    <header className="px-4 py-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-10">
          <a
            href="/"
            aria-label="TaskSpace home"
            className="flex w-fit items-center gap-3 rounded-xl outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm">
              <LogoTask className="size-9" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-1 text-lg sm:text-xl">
              <span className="font-bold text-slate-900">Task</span>
              <span className="text-slate-600">Space</span>
            </div>
          </a>

          <form
            role="search"
            className="w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="project-search" className="sr-only">
              Search list
            </label>

            <div className="flex w-full items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 md:w-[320px]">
              <SearchIcon
                className="size-4 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="project-search"
                name="search"
                type="search"
                placeholder="Search list..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </form>
        </div>

        <div className="flex w-full md:w-auto">
          <button
            type="button"
            onClick={onAddProject}
            className="w-full cursor-pointer rounded-full bg-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 md:w-auto"
          >
            Add New List
          </button>
        </div>
      </nav>
    </header>
  );
}
