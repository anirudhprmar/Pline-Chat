# Pline Chat

Pline Chat is a modern, privacy-first AI chat application that empowers you to interact with advanced language models like Gemini, OpenAI, and xAI—all from a beautiful, responsive interface. Your data stays on your device: nothing is uploaded to any server, ensuring your conversations remain truly private.

## ✨ Features

- **Multi-Provider AI:** Seamlessly switch between Google Gemini, OpenAI, and xAI models.
- **Private & Local:** All chat data is stored locally in your browser using IndexedDB (Dexie.js).
- **Rich Markdown Support:** Enjoy formatted responses, code blocks, and syntax highlighting.
- **API Key Management:** Securely save, update, or remove your API keys for each provider.
- **Persistent Chat History:** Revisit, rename, or delete past conversations at any time.
- **Streaming Responses:** Watch AI responses appear in real time.
- **Modern UI:** Built with shadcn/ui and Tailwind CSS for a clean, accessible experience.
- **Dark Mode:** Fully supported for comfortable chatting day or night.

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **Dexie.js** (IndexedDB wrapper for local storage)
- **shadcn/ui** (UI components)
- **Vercel AI SDK** (`@ai-sdk/react`)
- **Zustand** (state management for provider/model/API keys)
- **TypeScript** (type safety)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- API keys for your chosen AI providers (Google Gemini, OpenAI, xAI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anirudhprmar/Pline-Chat.git
   cd Pline-Chat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```


## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

---

**Pline Chat** – Your private, multi-provider AI chat