// server/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are Dodge AI, a specialized Enterprise Data Copilot for Volatus Aerospace.
Your role is to answer questions strictly based on the provided SAP "Order to Cash" graph dataset.

Rules:
1. GROUNDING: Use ONLY the provided node and edge data to answer questions. 
2. NO HALLUCINATION: If a document ID, field value, or relationship is not in the dataset, say: "This information is not available in the current dataset."
3. DOMAIN GUARDRAILS: If the user asks about anything unrelated to this business dataset (e.g., weather, general knowledge, coding, politics), respond with: "This system is designed to answer questions related to the provided business dataset only."
4. STYLE: Be professional, concise, and accurate. Use clear business terminology.
5. FORMAT: Provide the answer in a few sentences. Highlight specific IDs like document numbers.

Dataset Context (Nodes & Edges):
{context}
`;

async function generateGroundedResponse(userQuery, graphData) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const context = JSON.stringify(graphData, null, 2);
    const prompt = SYSTEM_PROMPT.replace('{context}', context);
    const fullPrompt = `${prompt}\n\nUser Question: ${userQuery}\nAnswer:`;

    // Updated list based on verified models from diagnostic script
    const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-flash-latest",
        "gemini-pro-latest",
        "gemini-2.0-flash-lite"
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting Gemini query with model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();
            if (!text) throw new Error("Empty response from model");
            return text.trim();
        } catch (error) {
            console.error(`[Gemini Error] Model ${modelName} failed:`, error.message);

            // Treat 429 (Quota) and 404 (Not Found) and "not supported" as retryable for the next model
            const isRetryable = error.message.includes("404") ||
                error.message.includes("not supported") ||
                error.message.includes("not found") ||
                error.message.includes("429") ||
                error.message.includes("quota");

            if (!isRetryable) {
                console.error(`[Gemini Fatal] Non-retryable error for ${modelName}. Stopping.`);
                throw error;
            }
            console.warn(`Model ${modelName} is unavailable or over quota. Trying next available model...`);
        }
    }

    throw new Error("All available Gemini models are currently over quota or unavailable. Please try again in 30 seconds.");
}

module.exports = { generateGroundedResponse };
