import { useState } from "react";
import {
  Sparkles,
  Copy,
  Save,
  Download,
  RotateCcw,
  Expand,
  Minimize2,
  FileText,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  generateBlog,
  type Tone,
  type Length,
  type Language,
  type WritingStyle,
  type BlogPost,
} from "../lib/ai-service";
import { saveItem } from "../lib/storage-service";

const tones: Tone[] = ["Professional", "Friendly", "Casual", "Academic", "Creative", "Persuasive"];
const lengths: Length[] = ["Short", "Medium", "Long"];
const languages: Language[] = ["English", "Telugu", "Hindi"];
const styles: WritingStyle[] = ["Conversational", "Academic", "Storytelling", "Journalistic"];

export function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [articleLength, setArticleLength] = useState<Length>("Medium");
  const [writingStyle, setWritingStyle] = useState<WritingStyle>("Conversational");
  const [language, setLanguage] = useState<Language>("English");
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sectionEdits, setSectionEdits] = useState<Record<number, string>>({});

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a blog topic");
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateBlog({
        topic: topic.trim(),
        keywords,
        targetAudience: targetAudience || "general readers",
        tone,
        articleLength,
        writingStyle,
        language,
        additionalInstructions,
      });
      setBlog(result);
      const edits: Record<number, string> = {};
      result.sections.forEach((s, i) => (edits[i] = s.content));
      setSectionEdits(edits);
      toast.success("Blog generated successfully");
    } catch {
      toast.error("Failed to generate blog");
    } finally {
      setIsGenerating(false);
    }
  };

  const fullContent = () => {
    if (!blog) return "";
    const sections = blog.sections
      .map((s, i) => `${s.heading}\n\n${sectionEdits[i] || s.content}`)
      .join("\n\n");
    return `${blog.title}\n\n${blog.introduction}\n\n${sections}\n\nKey Points\n${blog.keyPoints
      .map((p) => `• ${p}`)
      .join("\n")}\n\n${blog.conclusion}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleSave = () => {
    if (!blog) return;
    saveItem({
      title: blog.title,
      content: fullContent(),
      contentType: "Blog Article",
      topic,
      tone,
      length: articleLength,
      language,
      wordCount: blog.wordCount,
    });
    toast.success("Blog saved to history");
  };

  const handleDownload = (format: "txt" | "md") => {
    if (!blog) return;
    const blob = new Blob([fullContent()], {
      type: format === "md" ? "text/markdown" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${blog.title}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded as ${format.toUpperCase()}`);
  };

  const regenerateSection = async (index: number) => {
    if (!blog) return;
    toast.info("Regenerate is a demo action — content refreshed locally.");
    setSectionEdits((prev) => ({
      ...prev,
      [index]: prev[index] + "\n\n[Regenerated section with fresh phrasing.]",
    }));
  };

  const expandSection = (index: number) => {
    if (!blog) return;
    setSectionEdits((prev) => ({
      ...prev,
      [index]: prev[index] + "\n\n[Expanded with additional detail and examples.]",
    }));
  };

  const shortenSection = (index: number) => {
    if (!blog) return;
    const current = sectionEdits[index] || blog.sections[index]?.content || "";
    const sentences = current.split(/(?<=[.!?])\s+/).filter(Boolean);
    setSectionEdits((prev) => ({
      ...prev,
      [index]: sentences.slice(0, Math.max(2, Math.ceil(sentences.length * 0.5))).join(" ") + " [Condensed.]",
    }));
  };

  return (
    <div className="animate-rise">
      <div className="mb-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Blog Generator</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Generate a complete blog post</h1>
      </div>

      <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.5)] backdrop-blur-xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <Label className="text-xs font-semibold text-muted-custom">Blog Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Impact of Artificial Intelligence on Education"
              className="mt-1.5 rounded-xl border-line bg-frost/60"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-custom">Keywords</Label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="AI, students, online learning"
              className="mt-1.5 rounded-xl border-line bg-frost/60"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-custom">Target Audience</Label>
            <Input
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="College Students"
              className="mt-1.5 rounded-xl border-line bg-frost/60"
            />
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
            <Label className="text-xs font-semibold text-muted-custom">Article Length</Label>
            <Select value={articleLength} onValueChange={(v) => setArticleLength(v as Length)}>
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
            <Label className="text-xs font-semibold text-muted-custom">Writing Style</Label>
            <Select value={writingStyle} onValueChange={(v) => setWritingStyle(v as WritingStyle)}>
              <SelectTrigger className="mt-1.5 rounded-xl border-line bg-frost/60 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {styles.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
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
          <div className="sm:col-span-2 lg:col-span-3">
            <Label className="text-xs font-semibold text-muted-custom">Additional Instructions</Label>
            <Textarea
              rows={2}
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="Tell AI exactly how you want the blog..."
              className="mt-1.5 resize-none rounded-xl border-line bg-frost/60"
            />
          </div>
        </div>
        <Button
          onClick={generate}
          disabled={isGenerating}
          className="mt-6 w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white"
        >
          {isGenerating ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Sparkles className="mr-2 size-4 text-brand" />}
          {isGenerating ? "Generating Blog…" : "Generate Blog"}
        </Button>
      </div>

      {blog && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <div>
              <h2 className="text-xl font-bold text-ink">{blog.title}</h2>
              <p className="text-xs text-muted-custom">
                {blog.wordCount} words · {blog.readingTime} min read
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy(fullContent())}>
                <Copy className="mr-1 size-3" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="mr-1 size-3" /> Save Blog
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload("txt")}>
                <Download className="mr-1 size-3" /> TXT
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload("md")}>
                MD
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Meta Description</h3>
            <p className="mt-1 text-sm text-muted-custom">{blog.metaDescription}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {blog.seoKeywords.map((k) => (
                <span key={k} className="rounded-full border border-line bg-frost px-2.5 py-1 text-xs font-medium text-muted-custom">
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Introduction</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{blog.introduction}</p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Table of Contents</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-custom">
              {blog.tableOfContents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          {blog.sections.map((section, i) => (
            <div key={i} className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
              <h3 className="font-semibold text-ink">{section.heading}</h3>
              <Textarea
                rows={5}
                value={sectionEdits[i] ?? section.content}
                onChange={(e) => setSectionEdits((prev) => ({ ...prev, [i]: e.target.value }))}
                className="mt-2 resize-none rounded-xl border-line bg-frost/60 text-sm text-ink/80"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => regenerateSection(i)}>
                  <RotateCcw className="mr-1 size-3" /> Regenerate
                </Button>
                <Button size="sm" variant="outline" onClick={() => expandSection(i)}>
                  <Expand className="mr-1 size-3" /> Expand
                </Button>
                <Button size="sm" variant="outline" onClick={() => shortenSection(i)}>
                  <Minimize2 className="mr-1 size-3" /> Shorten
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleCopy(sectionEdits[i] || section.content)}>
                  <Copy className="mr-1 size-3" /> Copy
                </Button>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Key Points</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
              {blog.keyPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Conclusion</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{blog.conclusion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
