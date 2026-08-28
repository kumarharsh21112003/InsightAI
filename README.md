# InsightAI: Smart Video Learning 🚀

Turn any YouTube video into an interactive, comprehensive study suite instantly using the power of **Google Gemini 1.5 Pro**. InsightAI bridges the gap between passive video consumption and active learning by automatically generating notes, flashcards, and an AI tutor from a simple video URL.

---

## ✨ Features

- **📝 Smart Summaries:** Instantly extracts the transcript and generates structured notes with key takeaways.
- **🃏 Auto-generated Flashcards:** Creates interactive flashcards for active recall and better memorization.
- **🤖 Context-Aware Q&A Tutor:** A personalized AI chatbot that answers your questions strictly based on the video's content, preventing AI hallucination.
- **🎨 Glassmorphism UI:** A sleek, modern, dark-themed user interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js
- **AI Engine:** Google Gemini 1.5 Pro API
- **APIs:** YouTube Transcript API

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need an API key from Google AI Studio for Gemini.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumarharsh21112003/InsightAI.git
   cd InsightAI
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5001
   ```
   Start the backend server:
   ```bash
   node server.js
   ```

3. **Setup the Frontend**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Run the App**
   Open your browser and navigate to `http://localhost:5173`. Paste a YouTube URL and let the AI do the work!

## 💡 How it Works

1. The React frontend accepts a YouTube URL and sends it to the Express backend.
2. The backend extracts the video ID, fetches the raw video transcript, and structures a highly optimized prompt.
3. The prompt and transcript are sent to the **Gemini 1.5 Pro** model.
4. Gemini processes the vast context and returns a strictly formatted JSON response containing the summary and flashcards.
5. The frontend parses this JSON to render the interactive study suite and initializes the Q&A Agent with the video's context.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/kumarharsh21112003/InsightAI/issues).

## 📄 License

This project is licensed under the MIT License.
