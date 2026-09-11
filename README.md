# AI Writing Studio

Build a complete, modern, responsive AI content-generation SaaS web application called WriteAI.

The goal is to create a realistic AI writing platform where users enter keywords, a topic, or their own instructions and generate customizable content.

IMPORTANT:

Build the application as a complete working frontend.

Do not create a basic static landing page.

Use reusable components and clean architecture.

Make all major buttons and navigation functional.

Use realistic demo/mock AI responses initially so the application works without an API key.

Keep the AI service isolated so a real AI API can be connected later.

Do not expose API keys in frontend code.

Do not unnecessarily redesign existing components when implementing functionality.

Prioritize functionality, responsive design, and professional UI.

APPLICATION NAME

WriteAI

Tagline:

"Turn your ideas into powerful content with AI."

1. DESIGN

Create a premium modern SaaS interface.

Design style:

Clean

Professional

Modern

Minimal

Responsive

Rounded cards

Subtle shadows

Smooth hover effects

Good spacing

Clear typography

Professional icons

Attractive buttons

Loading states

Toast notifications

Empty states

Error states

The application should look like a real commercial AI writing product, NOT a simple college project.

Use a consistent design system throughout the entire application.

Make the application fully responsive for:

Desktop

Laptop

Tablet

Mobile

2. NAVIGATION

Create a sticky navbar.

Left:

WriteAI logo

Navigation:

Home

AI Writer

Blog Generator

Templates

History

About

Right:

Search

Ask WriteAI

Login

Sign Up

On mobile convert navigation into a hamburger menu.

All navigation items must work.

3. HOME PAGE

Create a professional landing page.

Hero heading:

"Create Better Content with AI"

Subheading:

"Generate blogs, articles, summaries, paragraphs and more from just a few keywords."

Hero input:

Placeholder:

"Enter your topic or keywords..."

Buttons:

Generate Content

Try an Example

When the user enters a topic and clicks Generate Content, navigate to AI Writer and automatically populate the topic.

Create a feature section containing:

AI Blog Generator

Generate complete blog articles from a simple topic.

Smart Summaries

Convert long content into concise summaries.

Paragraph Generator

Generate clear and useful paragraphs.

Content Rewriter

Rewrite existing content in different styles.

SEO Content

Generate SEO-friendly titles, keywords and descriptions.

AI Writing Assistant

Ask the AI chatbot for writing help.

Add a "How It Works" section:

Enter your idea

Customize your requirements

Generate content

Edit and improve

Save or download

4. AI WRITER

Create the main AI writing workspace.

Use a two-column layout on desktop.

LEFT PANEL

Title:

"What do you want to write?"

Topic / Keywords

Large textarea.

Placeholder:

"Enter your topic, keywords or idea..."

Content Type

Dropdown:

Blog Article

Article

Introduction

Summary

Paragraph

Conclusion

Social Media Post

SEO Description

Tone

Dropdown:

Professional

Friendly

Casual

Academic

Creative

Persuasive

Length

Dropdown:

Short

Medium

Long

Language

Dropdown:

English

Telugu

Hindi

Additional Instructions

Textarea.

Placeholder:

"Tell AI exactly how you want the content..."

Example:

"Write in simple English for college students."

Primary button:

Generate Content

5. GENERATED CONTENT EDITOR

On the right side create:

Header:

Generated Content

The generated content must appear inside an editable editor.

The user must be able to directly modify the generated text.

Add buttons:

Copy

Save

Download

Regenerate

Rewrite

Expand

Shorten

Summarize

Improve

Add:

Undo

Redo

Display:

Word Count

Character Count

Reading Time

When Generate Content is clicked:

Validate the input.

Show a loading animation.

Generate realistic content based on the topic and selected options.

Display the result.

Update statistics.

Show a success notification.

Use demo generation logic for now.

Different topics should produce different realistic outputs.

6. CUSTOM CONTENT EDITING

The user must have control over the AI output.

Add an AI Actions section.

Actions:

Rewrite
"Rewrite this content."

Expand
"Make this content more detailed."

Shorten
"Make this content concise."

Improve
"Improve grammar and readability."

Summarize
"Create a short summary."

Change Tone
Allow the user to select another tone.

Also provide:

Custom Instruction

Textarea:

"Tell AI what you want to change..."

Example:

"Rewrite this paragraph in simple English."

Button:

Apply Changes

The selected/generated content should update without losing the rest of the article.

7. BLOG GENERATOR

Create a dedicated Blog Generator page.

Input:

Blog Topic

Keywords

Target Audience

Tone

Article Length

Writing Style

Language

Additional Instructions

Example:

Topic:

"Impact of Artificial Intelligence on Education"

Keywords:

"AI, students, teachers, online learning"

Target Audience:

"College Students"

When Generate Blog is clicked, generate:

Blog Title

Introduction

Table of Contents

Main Sections

Paragraphs

Key Points

Conclusion

SEO Keywords

Meta Description

Display each section as a separate editable card.

Each card should have:

Edit

Copy

Regenerate

Expand

Shorten

buttons.

Add:

Save Blog

Download Blog

8. AI CHATBOT

Create a reusable floating chatbot.

Bottom-right button:

Ask WriteAI

Clicking it opens a modern chat window.

Features:

User messages

AI responses

Message input

Send button

New Chat

Clear Chat

Copy response

Example requests:

"Give me 5 blog titles about AI."

"Make this paragraph shorter."

"Rewrite this professionally."

"Explain this topic in simple words."

Use realistic demo responses for now.

Make the chatbot available across the application.

9. HISTORY

Create a History page.

Save generated content to localStorage for now.

Each item should show:

Title

Content Type

Date

Word Count

Preview

Actions:

Open

Edit

Copy

Delete

Filters:

All

Blogs

Articles

Summaries

Paragraphs

Add history search.

History should remain after refreshing the browser.

10. TEMPLATES

Create a professional Templates page.

Categories:

Blogging

SEO Blog

How-To Article

Listicle

Educational Article

News Article

Marketing

Product Description

Advertisement

Social Media Post

Email

Academic

Essay

Introduction

Conclusion

Summary

Each template should have:

Name

Description

Category

Use Template button

When Use Template is clicked:

Navigate to AI Writer and automatically populate the required settings.

11. GLOBAL SEARCH

Implement the navbar search.

Search through:

History

Saved content

Templates

Show search suggestions.

Show an appropriate empty state when nothing is found.

Make search responsive on mobile.

12. DASHBOARD

Create a professional dashboard after login.

Heading:

"Welcome back!"

Statistics:

Articles Generated

Words Generated

Saved Content

Recent Projects

Add:

Start Writing

button.

Show recent projects.

Each project should have:

Title

Content Type

Date

Open

Edit

13. LOGIN / SIGN UP

Create professional authentication screens.

LOGIN:

Email

Password

Remember me

Forgot password

Login

SIGN UP:

Name

Email

Password

Confirm Password

Create Account

Add:

Continue with Google

Use mock/local authentication initially.

After login navigate to Dashboard.

14. ABOUT

Create an About page.

Explain:

"WriteAI is an AI-powered writing assistant that helps students, bloggers, creators, marketers and professionals create high-quality content quickly."

Include:

Mission

Features

How WriteAI works

Contact section

15. DOWNLOAD

Allow users to download generated content.

Provide:

Download as TXT

Download as Markdown

Keep the implementation simple and browser-based initially.

16. USER EXPERIENCE

Implement:

Loading animations

Button disabled states while generating

Toast notifications

Form validation

Error messages

Empty states

Confirmation before deleting

Smooth transitions

Responsive layouts

Do not allow empty content generation.

Show a helpful message if the user doesn't enter a topic.

17. DATA STRUCTURE

Use reusable models for generated content.

Each saved item should contain:

id

title

content

contentType

topic

tone

length

language

createdAt

wordCount

Use localStorage for persistence during the demo.

Keep the data layer separate so it can later be replaced by a real database.

18. AI SERVICE ARCHITECTURE

Create a separate AI service/module.

For now:

generateContent()

should use realistic mock generation.

Also prepare functions such as:

generateBlog()

generateSummary()

rewriteContent()

expandContent()

shortenContent()

improveContent()

chatWithAI()

Keep these functions separate from the UI.

Later these functions will be connected to a real AI API.

Never put an API key directly in frontend code.

19. COMPONENT ARCHITECTURE

Use reusable components such as:

Navbar

Sidebar

Button

Input

Textarea

ContentEditor

ContentCard

TemplateCard

HistoryCard

Chatbot

SearchBar

LoadingState

Toast

Modal

Keep components modular and maintainable.

Do not create one huge component containing the entire application.

20. FINAL QUALITY CHECK

Before finishing:

Check that:

All routes work.

Navbar works.

Mobile navigation works.

Generate Content works with demo AI.

Blog Generator works.

Generated content is editable.

Rewrite works.

Expand works.

Shorten works.

Summarize works.

Copy works.

Save works.

Delete works.

History works.

Search works.

Templates work.

Chatbot works.

Login/Signup works with mock authentication.

Dashboard works.

Download works.

localStorage persistence works.

No major console errors exist.

No broken buttons exist.

UI works on mobile and desktop.

Do not add unnecessary features that are not mentioned above.

Build the complete application with a polished, professional SaaS experience.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://write-ai-blog-creator.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c16a1f10-b935-4daa-b3ee-abc37b344eec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
