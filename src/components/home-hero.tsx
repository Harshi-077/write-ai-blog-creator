import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, ArrowRight, PenTool, FileText, Zap, Globe, History, LayoutTemplate } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function HomeHero() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");

  const startWriting = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }
    navigate({
      to: "/writer",
      search: { topic: topic.trim(), contentType: "Blog Article", tone: "Professional", length: "Medium", language: "English" },
    });
  };

  const features = [
    { icon: PenTool, title: "AI Writer", desc: "Generate articles, summaries, paragraphs and more." },
    { icon: FileText, title: "Blog Generator", desc: "Full blog posts with SEO metadata and sections." },
    { icon: LayoutTemplate, title: "Templates", desc: "Jump-start content with 13 ready-made templates." },
    { icon: History, title: "History", desc: "Save, search and reuse everything you create." },
    { icon: Zap, title: "Fast", desc: "Instant mock responses with realistic AI-quality text." },
    { icon: Globe, title: "Multilingual", desc: "Generate in English, Telugu and Hindi." },
  ];

  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-[0_24px_80px_-40px_rgba(20,30,60,0.5)] backdrop-blur-xl md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

        <p className="relative z-10 font-mono text-xs uppercase tracking-[0.25em] text-brand">WriteAI</p>
        <h1 className="relative z-10 mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          Create Better Content with AI
        </h1>
        <p className="relative z-10 mx-auto mt-4 max-w-2xl text-base text-muted-custom md:text-lg">
          Generate articles, blog posts, summaries, and social media content in seconds. No credit card required.
        </p>

        <div className="relative z-10 mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startWriting()}
            placeholder="Enter a topic or keywords..."
            className="h-12 flex-1 rounded-xl border-line bg-frost/60 px-4 text-ink placeholder:text-muted-custom/60"
          />
          <Button
            onClick={startWriting}
            className="h-12 rounded-xl bg-ink px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          >
            <Sparkles className="mr-2 size-4 text-brand" /> Generate
          </Button>
        </div>

        <button
          onClick={() =>
            navigate({
              to: "/writer",
              search: {
                topic: "The impact of AI on education",
                contentType: "Blog Article",
                tone: "Professional",
                length: "Medium",
                language: "English",
                instructions: "Write in simple English for college students.",
              },
            })
          }
          className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm text-muted-custom underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          Try an Example <ArrowRight className="size-3" />
        </button>
      </section>

      <section className="mt-12">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Features</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink">Everything you need to write faster</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-brand/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white transition-colors group-hover:bg-brand">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-custom">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-white/60 bg-ink p-8 text-center text-white md:p-14">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to speed up your writing?</h2>
        <p className="mt-2 text-white/70">Join thousands of creators using WriteAI to publish more, faster.</p>
        <Button
          onClick={() => navigate({ to: "/signup" })}
          className="mt-6 h-12 rounded-xl bg-brand px-8 font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          Get Started Free <ArrowRight className="ml-2 size-4" />
        </Button>
      </section>
    </div>
  );
}
