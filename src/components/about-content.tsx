import { Sparkles, Target, Zap, Mail } from "lucide-react";

export function AboutContent() {
  return (
    <div className="animate-rise">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">About</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">WriteAI</h1>
        <p className="mt-4 text-lg text-muted-custom">
          WriteAI is an AI-powered writing assistant that helps students, bloggers, creators, marketers and
          professionals create high-quality content quickly.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
            <Target className="size-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-ink">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-custom">
            To make powerful writing assistance accessible to everyone, turning ideas into polished content in
            minutes, not hours.
          </p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
            <Sparkles className="size-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-ink">Features</h2>
          <p className="mt-2 text-sm text-muted-custom">
            AI blog generation, smart summaries, content rewriting, SEO tools, paragraph generation, and a
            real-time writing assistant.
          </p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
            <Zap className="size-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-ink">How It Works</h2>
          <p className="mt-2 text-sm text-muted-custom">
            Enter your idea, customize the tone and format, generate content, then edit and save or download
            the final result.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-white/60 bg-white/60 p-8 text-center backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-ink">Get in touch</h2>
        <p className="mt-2 text-muted-custom">Have questions or feedback? We'd love to hear from you.</p>
        <a
          href="mailto:hello@writeai.example"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Mail className="size-4" /> hello@writeai.example
        </a>
      </div>
    </div>
  );
}
