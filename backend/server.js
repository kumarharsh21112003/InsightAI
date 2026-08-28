import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

// Helper to extract Video ID
function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Global variable to store active context for simplicity in this hackathon
let currentTranscriptText = "";

// Route 1: Analyze Video (Generates Summary & Flashcards)
app.post('/api/analyze', async (req, res) => {
    try {
        const { url } = req.body;
        const videoId = extractVideoId(url);
        
        if (!videoId) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        // Fetch Transcript
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        currentTranscriptText = transcript.map(t => t.text).join(' ');

        if (!currentTranscriptText) {
            return res.status(400).json({ error: "Could not fetch transcript" });
        }

        // Generate Insights using Gemini
        const prompt = `
          You are an Expert Technical Mentor and Professor. Analyze the following video transcript. 
          Your goal is to provide a "Next-Level" comprehensive, deeply educational study guide.
          
          Respond ONLY with a valid JSON object in this exact format:
          {
            "summary": "A highly detailed, exhaustive summary (2-3 paragraphs) explaining the core concepts in depth. Use markdown for emphasis if needed.",
            "takeaways": [
              "Detailed takeaway 1 with examples or technical depth...",
              "Detailed takeaway 2...",
              "..."
            ],
            "flashcards": [
              { "question": "Deep technical question?", "answer": "In-depth, accurate answer." },
              ... (At least 8 flashcards)
            ]
          }

          Transcript: ${currentTranscriptText}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean up markdown formatting if Gemini adds it
        const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonString);

        res.json(data);
    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "Failed to analyze video. Please ensure the video has English captions." });
    }
});

// Route 2: Chat with Video Context
app.post('/api/chat', async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!currentTranscriptText) {
            return res.status(400).json({ error: "No video context available. Please analyze a video first." });
        }

        const prompt = `
          You are an Expert Technical Mentor, Professor, and Software Engineer. 
          You are chatting with a student who is studying from a video transcript.
          
          Transcript Context:
          ${currentTranscriptText}

          Student's Question:
          ${question}

          Instructions:
          - Provide a deeply exhaustive, step-by-step, and expert-level answer.
          - Use rich Markdown (bolding, lists, tables) to make it highly readable like a Notion document.
          - Always include Code Examples or real-world analogies if applicable.
          - Do not give short 1-line answers unless explicitly asked. Be detailed, empathetic, and highly educational.
        `;

        const result = await model.generateContent(prompt);
        res.json({ answer: result.response.text() });
        
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Failed to generate answer." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
