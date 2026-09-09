import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { DashboardContent } from "../components/dashboard-content";
import { SearchModal } from "../components/search-modal";
import { Chatbot } from "../components/chatbot";
import { Footer } from "../components/footer";
import { useAuth } from "../lib/auth-context";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — WriteAI" },
      { name: "description", content: "Your WriteAI dashboard." },
      { property: "og:title", content: "Dashboard — WriteAI" },
      { property: "og:description", content: "Your WriteAI dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) navigate({ to: "/login" });
  }, [user, isLoading, navigate]);

  if (isLoading) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-frost text-ink font-sans antialiased">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <DashboardContent />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <Chatbot />
    </div>
  );
}
