import type { ContentType, Tone, Length, Language } from "./ai-service";

export interface SavedItem {
  id: string;
  title: string;
  content: string;
  contentType: ContentType;
  topic: string;
  tone: Tone;
  length: Length;
  language: Language;
  createdAt: string;
  wordCount: number;
}

const STORAGE_KEY = "writeai-history";

export function getHistory(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

export function saveItem(item: Omit<SavedItem, "id" | "createdAt">): SavedItem {
  const history = getHistory();
  const newItem: SavedItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newItem;
}

export function updateItem(id: string, updates: Partial<Omit<SavedItem, "id" | "createdAt">>): SavedItem | null {
  const history = getHistory();
  const index = history.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated = { ...history[index], ...updates } as SavedItem;
  history[index] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return updated;
}

export function deleteItem(id: string): boolean {
  const history = getHistory();
  const updated = history.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated.length < history.length;
}

export function searchHistory(query: string): SavedItem[] {
  const q = query.toLowerCase();
  return getHistory().filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.contentType.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q)
  );
}
