require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The SDK doesn't have a direct "listModels" on the genAI object usually, 
        // but it might fail during the call.
        // Actually, let's just try to call a very standard one.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Ahoj. Odpovedz jedným slovom: fungujem.");
        const response = await result.response;
        console.log("Response:", response.text());
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Details:", error.response.data);
        }
    }
}

listModels();
