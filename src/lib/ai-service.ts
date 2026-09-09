export type ContentType =
  | "Blog Article"
  | "Article"
  | "Introduction"
  | "Summary"
  | "Paragraph"
  | "Conclusion"
  | "Social Media Post"
  | "SEO Description";

export type Tone =
  | "Professional"
  | "Friendly"
  | "Casual"
  | "Academic"
  | "Creative"
  | "Persuasive";

export type Length = "Short" | "Medium" | "Long";
export type Language = "English" | "Telugu" | "Hindi";
export type WritingStyle = "Conversational" | "Academic" | "Storytelling" | "Journalistic";

export interface GenerateRequest {
  topic: string;
  contentType: ContentType;
  tone: Tone;
  length: Length;
  language: Language;
  additionalInstructions?: string;
}

export interface GeneratedContent {
  title: string;
  content: string;
  wordCount: number;
  charCount: number;
  readingTime: number;
}

export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  title: string;
  introduction: string;
  tableOfContents: string[];
  sections: BlogSection[];
  keyPoints: string[];
  conclusion: string;
  seoKeywords: string[];
  metaDescription: string;
  wordCount: number;
  charCount: number;
  readingTime: number;
}

const wordTargets: Record<Length, number> = {
  Short: 120,
  Medium: 280,
  Long: 520,
};

function estimateReadingTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function buildIntro(topic: string, tone: Tone) {
  const intros: Record<Tone, string> = {
    Professional: `In today's fast-moving landscape, ${topic} has become a critical area of focus for organizations and individuals alike. Understanding its nuances is no longer optional — it is essential for staying competitive and making informed decisions.`,
    Friendly: `Have you ever wondered how ${topic} actually works in real life? Let's break it down together in a way that feels simple, useful, and maybe even a little fun.`,
    Casual: `So, ${topic}. You've probably heard the buzz, but what does it really mean? Here's the deal, plain and simple.`,
    Academic: `${topic} represents a significant domain of inquiry, encompassing theoretical frameworks, empirical findings, and practical applications that merit careful analysis.`,
    Creative: `Picture this: a world where ${topic} changes everything we thought we knew. That future is closer than it seems, and the story is still being written.`,
    Persuasive: `${topic} is not just a trend — it is a transformation you cannot afford to ignore. Here's why acting now will put you ahead of the curve.`,
  };
  return intros[tone];
}

function buildBody(topic: string, tone: Tone, paragraphs: number) {
  const bodies: Record<Tone, string[]> = {
    Professional: [
      `One of the primary drivers behind ${topic} is the growing demand for efficiency and clarity. Teams that embrace it can streamline workflows, reduce redundancy, and focus on high-impact work.`,
      `Another important consideration is quality. When ${topic} is implemented thoughtfully, it raises standards across the board — from communication to execution.`,
      `Looking ahead, leaders should invest in the right tools, training, and culture to make ${topic} a sustainable advantage rather than a one-time initiative.`,
    ],
    Friendly: [
      `The best part about ${topic} is that anyone can get started. You don't need to be an expert — just curious and willing to learn as you go.`,
      `Small steps matter here. Even a tiny improvement in how you approach ${topic} can lead to noticeable results over time.`,
      `So if you are feeling overwhelmed, start simple. Pick one idea from this article and try it out this week.`,
    ],
    Casual: [
      `Here's the thing: ${topic} works best when you keep it real. No fancy jargon, no overcomplicating — just practical moves that make sense.`,
      `People often overthink ${topic}, but the basics are solid. Nail those first, then level up when you are ready.`,
      `At the end of the day, ${topic} is about making life easier. If it is not doing that, something needs to change.`,
    ],
    Academic: [
      `From a theoretical perspective, ${topic} can be situated within broader discussions of methodology, epistemology, and applied research.`,
      `Empirical evidence suggests that structured engagement with ${topic} yields measurable outcomes, though contextual factors remain significant.`,
      `Future research should continue to refine conceptual models and explore the boundary conditions under which ${topic} operates most effectively.`,
    ],
    Creative: [
      `Imagine ${topic} as a canvas. Every decision is a brushstroke, and the final picture depends on the courage to experiment.`,
      `The narrative around ${topic} is still unfolding. Those who contribute fresh perspectives will shape how the story is remembered.`,
      `In the end, ${topic} is less about perfection and more about momentum — the willingness to create, revise, and create again.`,
    ],
    Persuasive: [
      `The evidence is clear: ${topic} delivers results. The only question is whether you will be among the early adopters or the late followers.`,
      `Every day you delay is a day your competitors gain ground. ${topic} is the lever that can shift momentum in your favor.`,
      `Make the commitment today. The tools are ready, the path is proven, and the opportunity is yours to seize.`,
    ],
  };
  return bodies[tone].slice(0, paragraphs).join("\n\n");
}

function buildConclusion(topic: string, tone: Tone) {
  const conclusions: Record<Tone, string> = {
    Professional: `In summary, ${topic} offers meaningful opportunities for those prepared to engage with it strategically. By focusing on clarity, consistency, and continuous improvement, you can turn insight into impact.`,
    Friendly: `Thanks for reading! I hope this gives you a clearer picture of ${topic}. Remember, learning is a journey, and you are already on your way.`,
    Casual: `That's the gist of ${topic}. Keep it simple, stay curious, and you will figure out the rest as you go.`,
    Academic: `In conclusion, ${topic} warrants sustained scholarly and practical attention, given its multidimensional implications and evolving nature.`,
    Creative: `${topic} is an invitation — to question, to build, and to reimagine what is possible. The next chapter is yours to write.`,
    Persuasive: `The case for ${topic} is undeniable. The time to act is now. Take the first step, and let the results speak for themselves.`,
  };
  return conclusions[tone];
}

function titleFor(topic: string, contentType: ContentType, tone: Tone) {
  const prefixes: Record<ContentType, string> = {
    "Blog Article": "A Practical Guide to",
    Article: "Understanding",
    Introduction: "An Introduction to",
    Summary: "The Essential Summary of",
    Paragraph: "Key Insights on",
    Conclusion: "Final Thoughts on",
    "Social Media Post": "Why",
    "SEO Description": "Discover",
  };
  return `${prefixes[contentType]} ${topic}`;
}

export async function generateContent(req: GenerateRequest): Promise<GeneratedContent> {
  await simulateDelay(1200);

  const targetWords = wordTargets[req.length];
  const paragraphs = req.length === "Short" ? 2 : req.length === "Medium" ? 3 : 4;
  const intro = buildIntro(req.topic, req.tone);
  const body = buildBody(req.topic, req.tone, paragraphs);
  const conclusion = buildConclusion(req.topic, req.tone);

  let content = `${intro}\n\n${body}`;
  if (req.contentType !== "Introduction") {
    content += `\n\n${conclusion}`;
  }

  if (req.additionalInstructions) {
    content += `\n\n[Written with your instruction in mind: ${req.additionalInstructions}]`;
  }

  // Adjust length roughly
  const words = content.split(/\s+/).length;
  const ratio = targetWords / Math.max(1, words);
  if (ratio > 1.2) {
    content += `\n\n${buildBody(req.topic, req.tone, Math.min(2, paragraphs))}`;
  }

  const finalContent = content.trim();
  const finalWords = finalContent.split(/\s+/).length;

  return {
    title: titleFor(req.topic, req.contentType, req.tone),
    content: finalContent,
    wordCount: finalWords,
    charCount: finalContent.length,
    readingTime: estimateReadingTime(finalWords),
  };
}

export interface BlogGenerateRequest {
  topic: string;
  keywords: string;
  targetAudience: string;
  tone: Tone;
  articleLength: Length;
  writingStyle: WritingStyle;
  language: Language;
  additionalInstructions?: string;
}

export async function generateBlog(req: BlogGenerateRequest): Promise<BlogPost> {
  await simulateDelay(1600);

  const title = `${req.topic}: A Complete Guide for ${req.targetAudience}`;
  const keywords = req.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const intro = buildIntro(req.topic, req.tone);
  const conclusion = buildConclusion(req.topic, req.tone);

  const sections: BlogSection[] = [
    { heading: `What Is ${req.topic}?`, content: buildBody(req.topic, req.tone, 2) },
    { heading: `Why ${req.topic} Matters to ${req.targetAudience}`, content: buildBody(req.topic, req.tone, 2) },
    { heading: `How to Get Started With ${req.topic}`, content: buildBody(req.topic, req.tone, 2) },
    { heading: `Best Practices and Tips`, content: buildBody(req.topic, req.tone, 2) },
  ];

  const toc = sections.map((s) => s.heading);

  const keyPoints = [
    `${req.topic} is transforming how ${req.targetAudience.toLowerCase()} work and learn.`,
    `The right strategy can save time and improve outcomes significantly.`,
    `Start small, measure progress, and refine your approach over time.`,
    `Staying updated with trends in ${req.topic} is a long-term advantage.`,
  ];

  const fullContent = [title, intro, ...sections.map((s) => `${s.heading}\n${s.content}`), conclusion].join("\n\n");
  const wordCount = fullContent.split(/\s+/).length;

  return {
    title,
    introduction: intro,
    tableOfContents: toc,
    sections,
    keyPoints,
    conclusion,
    seoKeywords: keywords.length ? keywords : [req.topic, req.targetAudience],
    metaDescription: `Learn everything about ${req.topic} for ${req.targetAudience}. ${req.keywords}`,
    wordCount,
    charCount: fullContent.length,
    readingTime: estimateReadingTime(wordCount),
  };
}

export async function rewriteContent(content: string, tone: Tone): Promise<string> {
  await simulateDelay(900);
  return `${content}\n\n[Rewritten in a ${tone.toLowerCase()} tone while preserving the original meaning.]`;
}

export async function expandContent(content: string): Promise<string> {
  await simulateDelay(900);
  return `${content}\n\n[Expanded with additional detail, examples, and context to make the content more comprehensive.]\n\n${buildBody("the topic", "Professional", 2)}`;
}

export async function shortenContent(content: string): Promise<string> {
  await simulateDelay(800);
  const sentences = content.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, Math.max(2, Math.ceil(sentences.length * 0.5))).join(" ") + " [Condensed for brevity.]";
}

export async function improveContent(content: string): Promise<string> {
  await simulateDelay(800);
  return `${content}\n\n[Improved for grammar, clarity, and readability.]`;
}

export async function summarizeContent(content: string): Promise<string> {
  await simulateDelay(800);
  const sentences = content.split(/(?<=[.!?])\s+/).filter(Boolean);
  return `Summary: ${sentences.slice(0, Math.min(3, sentences.length)).join(" ")}`;
}

export async function chatWithAI(message: string): Promise<string> {
  await simulateDelay(700);
  const lower = message.toLowerCase();
  if (lower.includes("blog title") || lower.includes("titles")) {
    return "Here are 5 blog title ideas:\n1. The Adaptive Classroom: How AI Is Changing Education\n2. From Chalkboards to Chatbots: A New Era of Learning\n3. Prompting as a Learning Skill\n4. Can AI Make Teachers More Human?\n5. The Student's Guide to Learning With AI";
  }
  if (lower.includes("shorter") || lower.includes("shorten")) {
    return "I can shorten your paragraph. Paste it into the AI Writer and click the Shorten button.";
  }
  if (lower.includes("rewrite") || lower.includes("professionally")) {
    return "To rewrite content professionally, paste it into the editor, click Rewrite, and select the Professional tone.";
  }
  if (lower.includes("explain") || lower.includes("simple")) {
    return "I'll explain your topic in simple words. Enter it in the AI Writer, choose 'Paragraph', set the tone to Friendly, and click Generate.";
  }
  return "I'm here to help with your writing. Try asking for blog titles, a summary, or help rewriting a paragraph.";
}

function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
