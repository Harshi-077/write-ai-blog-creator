import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { TemplatesGrid } from "../components/templates-grid";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — WriteAI" },
      { name: "description", content: "Browse ready-made templates for blogs, marketing, academic writing and more." },
      { property: "og:title", content: "Templates — WriteAI" },
      { property: "og:description", content: "Browse ready-made templates for blogs, marketing, academic writing and more." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <TemplatesGrid />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
