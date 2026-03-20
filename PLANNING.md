# RefactorBuddy — Full Planning Document

---

## 📋 PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Overview
**Product Name:** RefactorBuddy  
**Type:** AI-powered code review chatbot  
**Deployment:** Vercel  
**Stack:** Next.js 14 + TypeScript + Claude API  

### Problem Statement
Junior and mid-level developers lack immediate access to senior code review. PRs sit unreviewed, bad patterns get merged, and engineers don't learn the "why" behind architectural decisions.

### Product Vision
A purpose-built code review chatbot that acts as a strict but fair senior architect mentor — delivering structured, actionable, educational code feedback in seconds.

### Target Users
- **Primary:** Junior/mid developers seeking code review
- **Secondary:** Senior devs wanting a second opinion on patterns
- **Context:** Solo devs, bootcamp grads, interview preppers

### Core Features

| # | Feature | Priority | Notes |
|---|---------|----------|-------|
| 1 | Code submission input | P0 | Textarea with syntax highlighting |
| 2 | Claude-powered structured review | P0 | 3-section output: Critique / Refactor / Principle |
| 3 | Streaming responses | P0 | Token-by-token rendering |
| 4 | Conversation history | P1 | Multi-turn within session |
| 5 | Code syntax highlighting | P1 | In both input and output |
| 6 | Copy-to-clipboard | P1 | On all code blocks |
| 7 | Language detection/selection | P2 | Auto-detect or manual picker |
| 8 | Empty state with examples | P1 | Reduces blank-page paralysis |
| 9 | Error state handling | P1 | API failures, rate limits |
| 10 | Keyboard shortcuts | P2 | Cmd+Enter to submit |

### Out of Scope (v1)
- Authentication / user accounts
- Saved review history
- GitHub PR integration
- Multi-file review

### Success Metrics
- User submits at least 2 code snippets per session
- Page load < 1.5s (LCP)
- First token appears < 800ms after submit
- Zero layout shift during streaming (CLS = 0)

---

## 🔧 TECHNICAL REQUIREMENTS DOCUMENT (TRD)

### Architecture Overview

```
Browser (Next.js Client)
    │
    ├── useChat (ai/react)  ←→  POST /api/chat (Edge Runtime)
    │                                │
    │                                └── Anthropic SDK (claude-3-5-sonnet)
    │                                     └── Streaming SSE response
    │
    └── React Components
         ├── ChatInterface (state owner)
         ├── MessageBubble (render user/assistant)
         ├── CodeInputArea (controlled textarea)
         └── EmptyState (onboarding)
```

### Tech Stack Decisions

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router | Server components, edge runtime, Vercel-native |
| Language | TypeScript strict | Assignment requirement, type safety |
| Styling | Tailwind CSS | Rapid utility-first, no class naming overhead |
| AI SDK | Vercel AI SDK (`ai`) | Abstracts streaming, `useChat` hook, Vercel integration |
| AI Provider | `@ai-sdk/anthropic` | Official Anthropic adapter for AI SDK |
| Markdown | `react-markdown` + `remark-gfm` | Rich markdown output from Claude |
| Syntax Highlighting | `react-syntax-highlighter` | Code blocks in both input preview and output |
| Icons | `lucide-react` | Tree-shakable, consistent icon set |
| Fonts | Geist Sans + JetBrains Mono | UI text + code text |

### API Contract

**Endpoint:** `POST /api/chat`  
**Runtime:** Edge  
**Request Body:**
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>
}
```
**Response:** `text/event-stream` (Vercel AI SDK data stream format)  
**Error Response:** `{ error: string }` with appropriate HTTP status

### Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-...        # Required
CLAUDE_MODEL=claude-3-5-sonnet-20241022   # Optional, has default
```

### Component Architecture

```
ChatInterface
├── props: none
├── state: managed by useChat hook
└── renders:
    ├── Header (static)
    ├── EmptyState (conditional: messages.length === 0)
    ├── MessageList (map over messages)
    │   └── MessageBubble (per message)
    │       ├── UserMessage → syntax-highlighted code block
    │       └── AssistantMessage → custom markdown renderer
    │           ├── CritiqueCard (🚨 section)
    │           ├── RefactorCard (🛠️ section)
    │           └── PrincipleCard (🎓 section)
    ├── TypingIndicator (conditional: isLoading)
    └── CodeInputArea
        ├── Textarea (controlled)
        ├── LanguageSelector
        ├── CharCount
        └── SubmitButton
```

### Streaming Implementation
Using Vercel AI SDK `streamText` + `toDataStreamResponse()` server-side, and `useChat` client-side. This handles:
- SSE connection management
- Token buffering
- Error recovery
- Abort on unmount

### Performance Budget
- JS bundle: < 150kb gzipped
- FCP: < 1s
- First token: < 800ms (network dependent)
- Code syntax highlighting: lazy-loaded

### Security
- API key stored in Vercel environment variables (never client-side)
- `ANTHROPIC_API_KEY` only accessible in Edge runtime
- No user input stored server-side
- Rate limiting: relies on Anthropic API limits (can add Upstash if needed)

---

## 🗺️ IMPLEMENTATION PLAN

### Phase 0: Project Setup
Initialize Next.js, install dependencies, configure environment.

### Phase 1: Core API Layer 
- System prompt engineering
- `/api/chat` route with streaming
- Error handling

### Phase 2: Base UI Shell 
- Layout, global CSS, design system (CSS vars, fonts)
- Header component
- Empty state / welcome screen

### Phase 3: Chat Functionality 
- `ChatInterface` with `useChat`
- `MessageBubble` with user/assistant variants
- `CodeInputArea` with submit logic
- `TypingIndicator`

### Phase 4: Output Rendering 
- Custom markdown renderer
- Three colored section cards (Critique / Refactor / Principle)
- Syntax highlighting in code blocks
- Copy-to-clipboard on code blocks

### Phase 5: Polish & UX Details
- Auto-scroll to latest message
- Keyboard shortcut (Cmd+Enter)
- Error state UI
- Responsive design (mobile)
- Loading skeleton
- Smooth animations

### Phase 6: Deployment 
- GitHub repo setup + README
- Vercel project creation
- Environment variable configuration
- Deploy & verify



---

## ✅ TASK BREAKDOWN

### Phase 0 — Setup
- [ ] `npx create-next-app@latest refactor-buddy --typescript --tailwind --app`
- [ ] `npm install ai @ai-sdk/anthropic react-markdown remark-gfm react-syntax-highlighter @types/react-syntax-highlighter lucide-react clsx`
- [ ] Create `.env.local` with `ANTHROPIC_API_KEY`
- [ ] Configure `tailwind.config.ts` with custom theme
- [ ] Add JetBrains Mono font via next/font or Google Fonts

### Phase 1 — API
- [ ] `lib/system-prompt.ts` — export full system prompt string
- [ ] `lib/types.ts` — Message, Language types
- [ ] `app/api/chat/route.ts` — streaming POST handler
- [ ] Test with curl/Postman

### Phase 2 — Shell
- [ ] `app/globals.css` — CSS variables, base styles, animations
- [ ] `app/layout.tsx` — root layout with fonts, metadata
- [ ] `app/page.tsx` — render `<ChatInterface />`
- [ ] `components/EmptyState.tsx` — welcome card with 3 example snippets

### Phase 3 — Chat Core
- [ ] `components/ChatInterface.tsx` — `useChat` + message list + scroll
- [ ] `components/TypingIndicator.tsx` — animated "Analyzing..." badge
- [ ] `components/CodeInputArea.tsx` — textarea + language select + submit

### Phase 4 — Rendering
- [ ] `components/MessageBubble.tsx` — user/assistant variants
- [ ] Custom markdown renderer for assistant messages
- [ ] Section card components (Critique/Refactor/Principle)
- [ ] Syntax highlighter integration
- [ ] `hooks/useCopyToClipboard.ts` + copy button UI

### Phase 5 — Polish
- [ ] Auto-scroll ref logic in `ChatInterface`
- [ ] Cmd+Enter keyboard shortcut in `CodeInputArea`
- [ ] Error boundary / error message UI
- [ ] Mobile responsive breakpoints
- [ ] Transition animations (message appear, section reveals)
- [ ] Favicon + OG metadata

### Phase 6 — Deploy
- [ ] `README.md` — what you built + why
- [ ] `git init && git remote add origin <url>`
- [ ] Vercel: import repo, add env vars, deploy
- [ ] Verify live URL
- [ ] Record Loom walkthrough
