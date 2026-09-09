import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, PenTool, Save, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../lib/auth-context";
import { getHistory } from "../lib/storage-service";
import { formatDistanceToNow } from "date-fns";

export function DashboardContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const history = useMemo(() => getHistory(), []);

  const totalWords = history.reduce((sum, item) => sum + item.wordCount, 0);
  const savedCount = history.length;

  return (
    <div className="animate-rise">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Welcome back, {user?.name || "Writer"}!</h1>
        <p className="mt-2 text-muted-custom">Here's what's happening with your content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
            <FileText className="size-4" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-custom">Articles Generated</p>
          <p className="mt-1 text-2xl font-bold text-ink">{savedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <PenTool className="size-4" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-custom">Words Generated</p>
          <p className="mt-1 text-2xl font-bold text-ink">{totalWords.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
            <Save className="size-4" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-custom">Saved Content</p>
          <p className="mt-1 text-2xl font-bold text-ink">{savedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <Clock className="size-4" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-custom">Recent Activity</p>
          <p className="mt-1 text-2xl font-bold text-ink">{history.length > 0 ? "Active" : "—"}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">Recent Projects</h2>
        <Button onClick={() => navigate({ to: "/writer" })} className="rounded-lg bg-ink text-white">
          Start Writing <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white/40 p-10 text-center">
          <p className="text-muted-custom">No projects yet. Start writing to see them here.</p>
          <Button onClick={() => navigate({ to: "/writer" })} className="mt-4 rounded-lg bg-brand text-white">
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {history.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-muted-custom">
                  {item.contentType} · {item.wordCount} words ·{" "}
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/history"
                  className="rounded-lg border border-line bg-frost px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  Open
                </Link>
                <Link
                  to="/writer"
                  className="rounded-lg border border-line bg-frost px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
