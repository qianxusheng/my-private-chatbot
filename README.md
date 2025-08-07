# My Private GPT Chatbot

A private GPT chatbot application built with Next.js and Ollama.

## Features

- 🤖 Local Ollama model integration
- 💬 Real-time chat interface
- 🎨 Modern responsive UI design
- 📝 Markdown rendering with syntax highlighting
- 🔄 Zustand state management
- ⚡ High-performance Next.js 14+ architecture

## Tech Stack

- **Frontend**: Next.js 15.4.6
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Model**: Ollama (llama3.2)
- **Markdown Rendering**: react-markdown + react-syntax-highlighter
- **Icons**: react-icons
- **Type Safety**: TypeScript

## Quick Start

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (18+ recommended)
2. Install [Ollama](https://ollama.ai/)
3. **Start Ollama server**:
   ```bash
   ollama serve
   ```
4. Pull the llama3.2 model:
   ```bash
   ollama pull llama3.2
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-private-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Make sure Ollama server is running**:
   ```bash
   ollama serve
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route handler
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   └── MessageContent.tsx       # Message content component
└── store/
    └── chatStore.ts             # Zustand chat state management
```

## ⚠️ Important: Ollama Server Setup

This application requires a local Ollama server to function. **Always ensure Ollama is running before starting the app**:

1. **Start Ollama server** (keep this running):
   ```bash
   ollama serve
   ```

2. Verify server is running by visiting: http://localhost:11434

3. If you see connection errors, check:
   - Ollama service is running: `ollama serve`
   - Model is available: `ollama list`
   - Port 11434 is accessible

### Ollama Configuration

Default configuration:
- Host: `http://127.0.0.1:11434`
- Model: `llama3.2`

To modify settings, edit `src/app/api/chat/route.ts`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Troubleshooting

### Common Issues

1. **"AI service is temporarily unavailable" Error**
   - **Most common cause**: Ollama server is not running
   - **Solution**: Run `ollama serve` in a terminal and keep it running
   - Check if port 11434 is accessible

2. **Model Not Found Error**
   - Download the model: `ollama pull llama3.2`
   - Verify model exists: `ollama list`

3. **API Request Failures**
   - Ensure Ollama server is running: `ollama serve`
   - Check network connectivity to localhost:11434

4. **Styling Issues**
   - Restart development server
   - Clear browser cache

## Contributing

Issues and Pull Requests are welcome!
