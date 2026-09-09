import { useEffect, useMemo, useRef, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  Sparkles,
  Copy,
  Save,
  Download,
  RotateCcw,
  RefreshCw,
  Expand,
  Minimize2,
  FileText,
  Wand2,
  Undo2,
  Redo2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  generateContent,
  rewriteContent,
  expandContent,
  shortenContent,
  improveContent,
  summarizeContent,
  type ContentType,
  type Tone,
  type Length,
  type Language,
  type GeneratedContent,
} from "../lib/ai-service";
import { saveItem } from "../lib/storage-service";

const contentTypes: ContentType[] = [
  "Blog Article",
  "Article",
  "Introduction",
  "Summary",
  "Paragraph",
  "Conclusion",
  "Social Media Post",
  "SEO Description",
];
const tones: Tone[] = ["Professional", "Friendly", "Casual", "Academic", "Creative", "Persuasive"];
const lengths: Length[] = ["Short", "Medium", "Long"];
const languages: Language[] = ["English", "Telugu", "Hindi"];

export function AIWriterWorkspace() {
  const search = useSearch({ from: "/writer" }) as Record<string, string | undefined>;

  const [topic, setTopic] = useState(search["topic"] || "");
  const [contentType, setContentType] = useState<ContentType>((search["contentType"] as ContentType) || "Blog Article");
  const [tone, setTone] = useState<Tone>((search["tone"] as Tone) || "Professional");
  const [length, setLength] = useState<Length>((search["length"] as Length) || "Medium");
  const [language, setLanguage] = useState<Language>((search["language"] as Language) || "English");
  const [instructions, setInstructions] = useState(search["instructions"] || "");

  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search["topic"]) {
      handleGenerate();
    }
  }, []);

  const stats = useMemo(() => {
    const words = editedContent.trim() ? editedContent.trim().split(/\s+/).length : 0;
    const chars = editedContent.length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readingTime };
  }, [editedContent]);

  const pushHistory = (content: string) => {
    const next = history.slice(0, historyIndex + 1);
    next.push(content);
    setHistory(next);
    setHistoryIndex(next.length - 1);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic or keywords");
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateContent({
        topic: topic.trim(),
        contentType,
        tone,
        length,
        language,
        additionalInstructions: instructions,
      });
      setGenerated(result);
      setEditedContent(result.content);
      pushHistory(result.content);
      toast.success("Content generated successfully");
    } catch {
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAction = async (action: string, customInstruction?: string) => {
    if (!editedContent.trim()) {
      toast.error("No content to edit");
      return;
    }
    setIsActionLoading(true);
    try {
      let updated = editedContent;
      switch (action) {
        case "rewrite":
          updated = await rewriteContent(editedContent, tone);
          break;
        case "expand":
          updated = await expandContent(editedContent);
          break;
        case "shorten":
          updated = await shortenContent(editedContent);
          break;
        case "improve":
          updated = await improveContent(editedContent);
          break;
        case "summarize":
          updated = await summarizeContent(editedContent);
          break;
        case "custom":
          updated = `${editedContent}\n\n[Applied custom instruction: ${customInstruction || "none"}]`;
          break;
      }
      setEditedContent(updated);
      pushHistory(updated);
      toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)} applied`);
    } catch {
      toast.error("Action failed");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditedContent(history[historyIndex - 1] || "");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditedContent(history[historyIndex + 1] || "");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    toast.success("Copied to clipboard");
  };

  const handleSave = () => {
    if (!generated || !editedContent.trim()) {
      toast.error("Nothing to save");
      return;
    }
    saveItem({
      title: generated.title,
      content: editedContent,
      contentType,
      topic,
      tone,
      length,
      language,
      wordCount: stats.words,
    });
    toast.success("Saved to history");
  };

  const handleDownload = (format: "txt" | "md") => {
    if (!editedContent.trim()) {
      toast.error("Nothing to download");
      return;
    }
    const blob = new Blob([editedContent], {
      type: format === "md" ? "text/markdown" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generated?.title || "writeai-content"}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded as ${format.toUpperCase()}`);
  };

  const handleExample = () => {
    setTopic("The impact of AI on education");
    setContentType("Blog Article");
    setTone("Professional");
    setLength("Medium");
    setLanguage("English");
    setInstructions("Write in simple English for college students.");
  };

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">The Workspace</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink">Build a draft, then refine it live</h2>
        </div>
        <span className="hidden font-mono text-xs text-muted-custom sm:block">v2.0 · demo data</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        {/* LEFT PANEL */}
        <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.5)] backdrop-blur-xl lg:sticky lg:top-24 lg:self-start">
          <h3 className="text-[15px] font-bold tracking-tight text-ink">What do you want to write?</h3>

          <div className="mt-4 space-y-4">
            <div>
              <Label className="text-xs font-semibold text-muted-custom">Topic / Keywords</Label>
              <Textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic, keywords or idea..."
                className="mt-1.5 resize-none rounded-xl border-line bg-frost/60 text-sm text-ink placeholder:text-muted-custom/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label className="text-xs font-semibold text-muted-custom">Content Type</Label>
                <Select value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
                  <SelectTrigger className="mt-1.5 rounded-xl border-line bg-frost/60 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-custom">Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger className="mt-1.5 rounded-xl border-line bg-frost/60 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-custom">Length</Label>
                <Select value={length} onValueChange={(v) => setLength(v as Length)}>
                  <SelectTrigger className="mt-1.5 rounded-xl border-line bg-frost/60 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengths.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-custom">Language</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger className="mt-1.5 rounded-xl border-line bg-frost/60 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-muted-custom">Additional Instructions</Label>
              <Textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Tell AI exactly how you want the content..."
                className="mt-1.5 resize-none rounded-xl border-line bg-frost/60 text-sm text-ink placeholder:text-muted-custom/60"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-brand/50"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 size-4 text-brand" />
              )}
              {isGenerating ? "Generating…" : "Generate Content"}
            </Button>

            <button
              onClick={handleExample}
              className="w-full text-center text-sm text-muted-custom underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              Try an Example
            </button>
          </div>
        </div>

        {/* RIGHT EDITOR */}
        <div className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.5)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand" />
              <span className="text-sm font-semibold tracking-tight text-ink">Generated Content</span>
              {generated && (
                <span className="rounded-md border border-line bg-frost px-1.5 py-0.5 font-mono text-[10px] text-muted-custom">
                  {contentType}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-custom">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="rounded-md p-1.5 transition-colors hover:bg-ink/5 disabled:opacity-40"
              >
                <Undo2 className="size-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="rounded-md p-1.5 transition-colors hover:bg-ink/5 disabled:opacity-40"
              >
                <Redo2 className="size-4" />
              </button>
              <span className="mx-1 h-4 w-px bg-line" />
              <button
                onClick={handleCopy}
                className="rounded-md border border-line bg-frost px-2.5 py-1 font-medium text-ink transition-colors hover:bg-ink/5"
              >
                <Copy className="mr-1 inline size-3" /> Copy
              </button>
              <button
                onClick={handleSave}
                className="rounded-md border border-line bg-frost px-2.5 py-1 font-medium text-ink transition-colors hover:bg-ink/5"
              >
                <Save className="mr-1 inline size-3" /> Save
              </button>
              <button
                onClick={() => handleDownload("txt")}
                className="rounded-md border border-line bg-frost px-2.5 py-1 font-medium text-ink transition-colors hover:bg-ink/5"
              >
                <Download className="mr-1 inline size-3" /> TXT
              </button>
              <button
                onClick={() => handleDownload("md")}
                className="rounded-md border border-line bg-frost px-2.5 py-1 font-medium text-ink transition-colors hover:bg-ink/5"
              >
                MD
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-b border-line/70 px-5 py-2.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.15em] text-brand">AI</span>
            {[
              { label: "Regenerate", icon: RotateCcw, action: () => handleGenerate() },
              { label: "Rewrite", icon: RefreshCw, action: () => applyAction("rewrite") },
              { label: "Expand", icon: Expand, action: () => applyAction("expand") },
              { label: "Shorten", icon: Minimize2, action: () => applyAction("shorten") },
              { label: "Summarize", icon: FileText, action: () => applyAction("summarize") },
              { label: "Improve", icon: Wand2, action: () => applyAction("improve") },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={btn.action}
                disabled={isActionLoading}
                className="rounded-lg border border-line bg-white/60 px-2.5 py-1 text-xs font-medium text-ink/80 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-ink disabled:opacity-50"
              >
                <btn.icon className="mr-1 inline size-3" />
                {btn.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 px-6 py-5">
            {isGenerating && !generated && (
              <div className="pointer-events-none absolute inset-x-6 top-[38px] h-px bg-brand/30 animate-scan" />
            )}
            {generated ? (
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const text = e.currentTarget.innerText;
                  setEditedContent(text);
                }}
                className="h-full min-h-[300px] w-full whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink/80 outline-none"
              >
                {editedContent}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-custom">
                <Sparkles className="size-10 text-brand/30" />
                <p className="mt-3 text-sm">Enter a topic and click Generate Content to see results here.</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 px-5 py-2.5 font-mono text-[11px] text-muted-custom">
            <div className="flex gap-4">
              <span>
                <span className="text-ink">{stats.words}</span> words
              </span>
              <span>
                <span className="text-ink">{stats.chars.toLocaleString()}</span> chars
              </span>
              <span>
                <span className="text-ink">{stats.readingTime} min</span> read
              </span>
            </div>
            {isGenerating && <span className="text-brand animate-pulse-soft">● Generating…</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
