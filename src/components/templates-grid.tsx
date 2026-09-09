import { useNavigate } from "@tanstack/react-router";
import { FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import type { ContentType, Tone, Length, Language } from "../lib/ai-service";

export interface Template {
  name: string;
  description: string;
  category: string;
  defaults: {
    topic: string;
    contentType: ContentType;
    tone: Tone;
    length: Length;
    language: Language;
    additionalInstructions: string;
  };
}

export const templates: Template[] = [
  {
    name: "SEO Blog",
    description: "Write a search-optimized blog post with keywords naturally woven in.",
    category: "Blogging",
    defaults: {
      topic: "Top SEO strategies for 2026",
      contentType: "Blog Article",
      tone: "Professional",
      length: "Medium",
      language: "English",
      additionalInstructions: "Include keywords naturally and add a meta description."
    }
  },
  {
    name: "How-To Article",
    description: "Step-by-step guide that teaches readers how to accomplish something.",
    category: "Blogging",
    defaults: {
      topic: "How to start a successful blog",
      contentType: "Article",
      tone: "Friendly",
      length: "Long",
      language: "English",
      additionalInstructions: "Use clear numbered steps and practical examples."
    }
  },
  {
    name: "Listicle",
    description: "Engaging numbered list article that is easy to scan.",
    category: "Blogging",
    defaults: {
      topic: "10 productivity tips for remote workers",
      contentType: "Article",
      tone: "Casual",
      length: "Medium",
      language: "English",
      additionalInstructions: "Format as a numbered list with brief explanations."
    }
  },
  {
    name: "Educational Article",
    description: "Explain a topic clearly for learners.",
    category: "Blogging",
    defaults: {
      topic: "The basics of machine learning",
      contentType: "Article",
      tone: "Academic",
      length: "Medium",
      language: "English",
      additionalInstructions: "Define key terms and keep the tone informative."
    }
  },
  {
    name: "News Article",
    description: "Write an objective, timely news-style piece.",
    category: "Blogging",
    defaults: {
      topic: "Latest trends in artificial intelligence",
      contentType: "Article",
      tone: "Professional",
      length: "Short",
      language: "English",
      additionalInstructions: "Write in an objective, journalistic style."
    }
  },
  {
    name: "Product Description",
    description: "Compelling copy that highlights benefits and features.",
    category: "Marketing",
    defaults: {
      topic: "AI writing assistant software",
      contentType: "Paragraph",
      tone: "Persuasive",
      length: "Short",
      language: "English",
      additionalInstructions: "Focus on benefits and include a call to action."
    }
  },
  {
    name: "Advertisement",
    description: "Short punchy ad copy that drives action.",
    category: "Marketing",
    defaults: {
      topic: "New online course launch",
      contentType: "Social Media Post",
      tone: "Persuasive",
      length: "Short",
      language: "English",
      additionalInstructions: "Make it catchy and include urgency."
    }
  },
  {
    name: "Social Media Post",
    description: "Snackable content for social channels.",
    category: "Marketing",
    defaults: {
      topic: "Motivational Monday for creators",
      contentType: "Social Media Post",
      tone: "Friendly",
      length: "Short",
      language: "English",
      additionalInstructions: "Keep it under 100 words and engaging."
    }
  },
  {
    name: "Email",
    description: "Professional or promotional email copy.",
    category: "Marketing",
    defaults: {
      topic: "Welcome email for new subscribers",
      contentType: "Paragraph",
      tone: "Friendly",
      length: "Short",
      language: "English",
      additionalInstructions: "Include a greeting, body, and closing."
    }
  },
  {
    name: "Essay",
    description: "Structured academic essay with argument and evidence.",
    category: "Academic",
    defaults: {
      topic: "The impact of technology on education",
      contentType: "Article",
      tone: "Academic",
      length: "Long",
      language: "English",
      additionalInstructions: "Include an introduction, body paragraphs, and conclusion."
    }
  },
  {
    name: "Introduction",
    description: "Strong opening paragraph for any piece.",
    category: "Academic",
    defaults: {
      topic: "Climate change and its effects",
      contentType: "Introduction",
      tone: "Academic",
      length: "Short",
      language: "English",
      additionalInstructions: "Hook the reader and state the purpose clearly."
    }
  },
  {
    name: "Conclusion",
    description: "Wrap up your writing with a clear takeaway.",
    category: "Academic",
    defaults: {
      topic: "The future of renewable energy",
      contentType: "Conclusion",
      tone: "Professional",
      length: "Short",
      language: "English",
      additionalInstructions: "Summarize key points and end with a forward-looking statement."
    }
  },
  {
    name: "Summary",
    description: "Concise summary of a longer text or topic.",
    category: "Academic",
    defaults: {
      topic: "Key findings from a research paper",
      contentType: "Summary",
      tone: "Professional",
      length: "Short",
      language: "English",
      additionalInstructions: "Capture the main points in simple language."
    }
  },
];

export function TemplatesGrid() {
  const navigate = useNavigate();
  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const useTemplate = (template: Template) => {
    const params = new URLSearchParams({
      topic: template.defaults.topic,
      contentType: template.defaults.contentType,
      tone: template.defaults.tone,
      length: template.defaults.length,
      language: template.defaults.language,
      instructions: template.defaults.additionalInstructions,
    });
    navigate({ to: `/writer?${params.toString()}` });
    toast.success(`Loaded "${template.name}" template`);
  };

  return (
    <div className="animate-rise">
      <div className="mb-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Templates</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Start with a proven framework</h1>
        <p className="mt-2 text-muted-custom">Choose a template and jump straight into the AI Writer.</p>
      </div>

      <div className="space-y-10">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="mb-4 text-xl font-semibold text-ink">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((t) => t.category === category)
                .map((template) => (
                  <div
                    key={template.name}
                    className="group rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_60px_-40px_rgba(20,30,60,0.5)]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
                      <FileText className="size-4" />
                    </div>
                    <h3 className="mt-4 text-[15px] font-bold tracking-tight text-ink">{template.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-custom">{template.description}</p>
                    <Button
                      size="sm"
                      onClick={() => useTemplate(template)}
                      className="mt-4 rounded-lg bg-ink text-xs text-white hover:bg-ink/90"
                    >
                      Use Template <ArrowRight className="ml-1 size-3" />
                    </Button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
