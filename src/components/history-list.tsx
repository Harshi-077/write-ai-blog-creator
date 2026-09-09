import { useMemo, useState } from "react";
import { Search, Trash2, Copy, FileEdit, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getHistory, deleteItem, type SavedItem } from "../lib/storage-service";
import { formatDistanceToNow } from "date-fns";
import type { ContentType } from "../lib/ai-service";

const filters: ("All" | ContentType)[] = [
  "All",
  "Blog Article",
  "Article",
  "Summary",
  "Paragraph",
  "Social Media Post",
  "SEO Description",
];

export function HistoryList() {
  const [history, setHistory] = useState<SavedItem[]>(() => getHistory());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | ContentType>("All");

  const filtered = useMemo(() => {
    let items = history;
    if (filter !== "All") items = items.filter((i) => i.contentType === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.content.toLowerCase().includes(q) ||
          i.topic.toLowerCase().includes(q)
      );
    }
    return items;
  }, [history, filter, query]);

  const remove = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
      setHistory(getHistory());
      toast.success("Deleted from history");
    }
  };

  const copy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="animate-rise">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">History</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Your saved content</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-custom">
          <Filter className="size-4" />
          <span>{history.length} saved items</span>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-custom" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search history..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-ink text-white"
                  : "border border-line bg-white/60 text-muted-custom hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/40 p-10 text-center">
          <p className="text-muted-custom">No saved content found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl transition-all hover:border-brand/30"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs text-muted-custom">
                    {item.contentType} · {item.wordCount} words ·{" "}
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copy(item.content)}
                    className="rounded-lg border border-line bg-frost p-2 text-muted-custom transition-colors hover:text-ink"
                  >
                    <Copy className="size-4" />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-lg border border-line bg-frost p-2 text-muted-custom transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-muted-custom">{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
