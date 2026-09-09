import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { AboutContent } from "../components/about-content";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WriteAI" },
      { name: "description", content: "Learn more about WriteAI, our mission, features, and how we help creators write better content." },
      { property: "og:title", content: "About — WriteAI" },
      { property: "og:description", content: "Learn more about WriteAI, our mission, features, and how we help creators write better content." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <AboutContent />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
