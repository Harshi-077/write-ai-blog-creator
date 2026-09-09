import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { BlogGenerator } from "../components/blog-generator";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Generator — WriteAI" },
      { name: "description", content: "Generate complete blog posts with SEO keywords and meta descriptions." },
      { property: "og:title", content: "Blog Generator — WriteAI" },
      { property: "og:description", content: "Generate complete blog posts with SEO keywords and meta descriptions." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <BlogGenerator />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
