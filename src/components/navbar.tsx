import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../lib/auth-context";
import { useChatbot } from "../lib/chatbot-context";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navItems = [
  { label: "Home", to: "/" },
  { label: "AI Writer", to: "/writer" },
  { label: "Blog Generator", to: "/blog" },
  { label: "Templates", to: "/templates" },
  { label: "History", to: "/history" },
  { label: "About", to: "/about" },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { user, logout } = useAuth();
  const { toggle } = useChatbot();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-ink text-white">
              <span className="text-xs font-bold">W</span>
            </span>
            <span className="text-[15px] font-bold tracking-tight text-ink">WriteAI</span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm text-muted-custom lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-medium transition-colors hover:bg-ink/5 hover:text-ink",
                  isActive(item.to) && "bg-ink text-white hover:bg-ink hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="hidden items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-sm text-muted-custom transition-colors hover:text-ink xl:flex"
          >
            <Search className="size-4 text-ink/40" />
            <span className="w-28 text-left">Search…</span>
            <kbd className="ml-2 rounded border border-line bg-frost px-1 text-[10px] font-mono">⌘K</kbd>
          </button>

          <button
            onClick={toggle}
            className="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-custom transition-colors hover:text-ink sm:flex"
          >
            <Sparkles className="size-4 text-brand" />
            Ask WriteAI
          </button>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-custom transition-colors hover:text-ink sm:block"
              >
                Dashboard
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={logout}
                className="rounded-lg bg-ink text-white ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-brand/40"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-custom transition-colors hover:text-ink sm:block"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-ink px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-brand/40"
              >
                Sign Up
              </Link>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="grid size-8 place-items-center rounded-lg border border-line bg-white/70 text-ink/60 lg:hidden">
                {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-line bg-white/90 backdrop-blur-xl">
              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.to)
                        ? "bg-ink text-white"
                        : "text-muted-custom hover:bg-ink/5 hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-2 border-line" />
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchOpen();
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-custom hover:bg-ink/5 hover:text-ink"
                >
                  <Search className="size-4" /> Search
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    toggle();
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-custom hover:bg-ink/5 hover:text-ink"
                >
                  <Sparkles className="size-4 text-brand" /> Ask WriteAI
                </button>
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted-custom hover:bg-ink/5 hover:text-ink"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-custom hover:bg-ink/5 hover:text-ink"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted-custom hover:bg-ink/5 hover:text-ink"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
