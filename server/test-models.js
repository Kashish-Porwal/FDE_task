// server/test-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Checking API Key...");
        if (!process.env.GEMINI_API_KEY) {
            console.error("Error: GEMINI_API_KEY not found in .env");
            return;
        }

        // Attempt to list all models available to this specific key
        console.log("Fetching definitive list of available models from Google...");

        // This is the correct way to list models in the Node.js SDK
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error.message);
            return;
        }

        if (data.models && data.models.length > 0) {
            console.log("\nSuccess! Here are the models your key can access:");
            data.models.forEach(m => {
                console.log(`- ${m.name} (${m.displayName})`);
            });
            console.log("\nPlease tell me which one you want to use!");
        } else {
            console.log("\nNo models found for this API key. This usually means the Generative AI API is not enabled for your project.");
        }

    } catch (error) {
        console.error("Diagnostic Error:", error.message);
    }
}

listModels();
