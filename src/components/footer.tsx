import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/40 py-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-ink text-white">
            <span className="text-xs font-bold">W</span>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-ink">WriteAI</span>
        </div>
        <p className="text-sm text-muted-custom">
          © {new Date().getFullYear()} WriteAI. Turn your ideas into powerful content.
        </p>
        <div className="flex gap-4 text-sm text-muted-custom">
          <Link to="/about" className="hover:text-ink">
            About
          </Link>
          <Link to="/templates" className="hover:text-ink">
            Templates
          </Link>
          <Link to="/history" className="hover:text-ink">
            History
          </Link>
        </div>
      </div>
    </footer>
  );
}
