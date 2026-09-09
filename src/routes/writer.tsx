import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { AIWriterWorkspace } from "../components/ai-writer-workspace";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";
import { useState } from "react";

export const Route = createFileRoute("/writer")({
  head: () => ({
    meta: [
      { title: "AI Writer — WriteAI" },
      { name: "description", content: "Generate articles, blogs, summaries and more with WriteAI's AI writer." },
      { property: "og:title", content: "AI Writer — WriteAI" },
      { property: "og:description", content: "Generate articles, blogs, summaries and more with WriteAI's AI writer." },
    ],
  }),
  component: WriterPage,
});

function WriterPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <AIWriterWorkspace />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
