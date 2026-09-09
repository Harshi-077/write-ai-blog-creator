import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, FileText, LayoutTemplate, History } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { getHistory } from "../lib/storage-service";
import { templates } from "./templates-grid";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const history = useMemo(() => getHistory(), [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.contentType.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (to: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search history, saved content, and templates…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty className="py-6 text-center text-sm text-muted-custom">
          No results found for "{query}".
        </CommandEmpty>
        {filteredHistory.length > 0 && (
          <CommandGroup heading="History">
            {filteredHistory.slice(0, 5).map((item) => (
              <CommandItem
                key={item.id}
                value={`history-${item.id}`}
                onSelect={() => handleSelect("/history")}
                className="cursor-pointer"
              >
                <History className="mr-2 size-4 text-brand" />
                <span className="flex-1 truncate">{item.title}</span>
                <span className="text-xs text-muted-custom">{item.contentType}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {filteredTemplates.length > 0 && (
          <CommandGroup heading="Templates">
            {filteredTemplates.map((t) => (
              <CommandItem
                key={t.name}
                value={`template-${t.name}`}
                onSelect={() => handleSelect("/templates")}
                className="cursor-pointer"
              >
                <LayoutTemplate className="mr-2 size-4 text-brand" />
                <span className="flex-1 truncate">{t.name}</span>
                <span className="text-xs text-muted-custom">{t.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => handleSelect("/writer")} className="cursor-pointer">
            <FileText className="mr-2 size-4 text-brand" /> AI Writer
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/blog")} className="cursor-pointer">
            <FileText className="mr-2 size-4 text-brand" /> Blog Generator
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/history")} className="cursor-pointer">
            <History className="mr-2 size-4 text-brand" /> History
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
