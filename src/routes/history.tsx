import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { HistoryList } from "../components/history-list";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — WriteAI" },
      { name: "description", content: "View and manage your previously generated content." },
      { property: "og:title", content: "History — WriteAI" },
      { property: "og:description", content: "View and manage your previously generated content." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <HistoryList />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
