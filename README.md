# GitHub Agent

A clean, Apple-inspired AI-powered interface for creating GitHub Issues and Pull Requests using natural language.

## Overview

GitHub Agent is a frontend application that allows users to describe tasks in plain English, which are then interpreted by an AI agent to create GitHub Issues or PRs. The interface follows Apple's Human Interface Guidelines for a native, professional feel.

## Features

- **Natural Language Input** — Describe what you want in plain English
- **AI Interpretation** — Agent parses intent and extracts structured data
- **Preview & Confirm** — Review parsed data before execution
- **GitHub-style Preview** — See how your issue/PR will appear
- **Success/Error States** — Clear feedback on action results

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui components

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── MessageInput.tsx    # Primary text input
│   ├── UserMessage.tsx     # User message bubble
│   ├── AgentMessage.tsx    # AI response with parsed data
│   ├── PreviewCard.tsx     # Confirmation preview
│   ├── LoadingState.tsx    # Processing indicator
│   └── ResultState.tsx     # Success/error display
├── lib/
│   └── mockAgent.ts        # Simulated API responses
├── types/
│   └── agent.ts            # TypeScript definitions
└── pages/
    └── Index.tsx           # Main application page
```

## Design Philosophy

This application follows Apple's Human Interface Guidelines:

- **Clarity** — Clean typography and clear visual hierarchy
- **Deference** — Content-first design, minimal chrome
- **Depth** — Subtle shadows and layering for context
- **Restraint** — No unnecessary animations or decorations

## API Contract

The frontend assumes a backend endpoint:

```
POST /agent/github

Request:
{
  "prompt": "Create a bug issue for login failure"
}

Response:
{
  "action": "create_issue" | "create_pr",
  "parsed_data": {
    "repo": "org/repo",
    "title": "...",
    "body": "...",
    "labels": [],
    "assignees": []
  },
  "status": "success" | "error",
  "message": "..."
}
```

Currently uses mocked responses with simulated latency.

## License

MIT
