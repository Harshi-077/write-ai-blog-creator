import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "../components/home-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WriteAI — AI Content Generation Platform" },
      { name: "description", content: "Generate articles, blog posts, summaries and social content with AI. Fast, simple, and free to try." },
      { property: "og:title", content: "WriteAI — AI Content Generation Platform" },
      { property: "og:description", content: "Generate articles, blog posts, summaries and social content with AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomeHero />;
}
