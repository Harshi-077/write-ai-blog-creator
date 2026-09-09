import { useRef, useState } from "react";
import { Sparkles, Send, X, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useChatbot } from "../lib/chatbot-context";
import { chatWithAI } from "../lib/ai-service";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const { isOpen, toggle, close } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm WriteAI. Ask me for blog titles, help rewriting, or anything about your content.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAI(text);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: response }]);
    } catch {
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm WriteAI. Ask me for blog titles, help rewriting, or anything about your content.",
      },
    ]);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={cn(
          "w-80 overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-[0_30px_70px_-30px_rgba(20,30,60,0.6)] backdrop-blur-2xl transition-all",
          isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-brand text-[11px] text-white">
              <Sparkles className="size-3" />
            </span>
            <span className="text-sm font-semibold text-ink">Ask WriteAI</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={clear} className="rounded p-1 text-muted-custom hover:bg-ink/5 hover:text-ink">
              <Trash2 className="size-3.5" />
            </button>
            <button onClick={close} className="rounded p-1 text-muted-custom hover:bg-ink/5 hover:text-ink">
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="h-80 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-start" : "justify-end")}>
              <div
                className={cn(
                  "group relative max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug",
                  msg.role === "user"
                    ? "rounded-tl-sm border border-line bg-frost/70 text-ink/80"
                    : "rounded-tr-sm bg-ink text-white"
                )}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => copy(msg.content)}
                    className="absolute -top-2 -right-2 rounded-full border border-line bg-white p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="size-3 text-ink" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-ink px-3 py-2 text-[13px] text-white">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:150ms]">.</span>
                  <span className="animate-bounce [animation-delay:300ms]">.</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-line/70 px-3 py-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="h-9 flex-1 rounded-lg border border-line bg-frost/60 px-3 text-[13px] text-ink outline-none placeholder:text-muted-custom/60 focus:ring-2 focus:ring-brand/40"
            placeholder="Message WriteAI…"
          />
          <Button
            size="icon"
            onClick={send}
            disabled={!input.trim() || isLoading}
            className="size-9 rounded-lg bg-ink text-white disabled:opacity-50"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>

      <Button
        onClick={toggle}
        className="flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-16px_rgba(20,30,60,0.6)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-brand/50"
      >
        <span className="grid size-5 place-items-center rounded-full bg-brand text-[11px]">
          <Sparkles className="size-3" />
        </span>
        Ask WriteAI
      </Button>
    </div>
  );
}
