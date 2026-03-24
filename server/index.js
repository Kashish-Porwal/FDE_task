// server/index.js
const express = require('express');
const cors = require('cors');
const { nodes, edges } = require('./data');
const { generateGroundedResponse } = require('./gemini');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 4000;

// Debug: Check Gemini SDK on startup
if (process.env.GEMINI_API_KEY) {
    console.log("Gemini API Key detected, initializing SDK...");
}

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// API route to get full graph data
app.get('/api/graph', (req, res) => {
    res.json({ nodes, edges });
});

// API route for chat/queries (Gemini powered)
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    console.log(`[API] Received chat request: "${message}"`);

    try {
        const response = await generateGroundedResponse(message, { nodes, edges });
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            response: "I'm sorry, I'm having trouble processing your request right now. Please ensure the API key is configured correctly."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
