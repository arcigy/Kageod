require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');

// System prompt to define Kageod AI's personality
const SYSTEM_PROMPT = `
Si inteligentný asistent pre geodetickú kanceláriu KAGEOD (sídlo Zvolen, tradícia od 1990).
Tvoja úloha je pomáhať návštevníkom s otázkami ohľadom geodetických prác.

DOLEŽITÉ PRAVIDLÁ:
1. Ak sa používateľ pýta na tému, ktorá je na konkrétnej podstránke, odpovedz stručne "Tu si o tom môžete prečítať:" a na koniec správy pridaj špeciálny príkaz v tvare [NAVIGATE:relatívna_cesta].
   Dostupné stránky:
   - Služby (vytýčenie, zameranie, geometrické plány): [NAVIGATE:sluzby.html]
   - O nás (história, tím): [NAVIGATE:o-nas.html]
   - Kontakt (adresa, formulár): [NAVIGATE:kontakt.html]
   - Domov: [NAVIGATE:index.html]

2. Každú odpoveď ukonči zdvorilou vetou: "Aké máte ešte nejaké otázky? Som tu pre vás."
3. Hovoríš po slovensky, si profesionálny a stručný.
4. Ak nevieš odpoveď, odporuč kontaktovať kanceláriu: Tel: +421 903 567 411, Email: kageod@kageod.sk.
5. Nepoužívaj markdown formátovanie (hviezdičky).
`;

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Use Gemini 2.0 Flash as requested
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `${SYSTEM_PROMPT}\n\nPoužívateľ sa pýta: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Bot Response:', text);

        res.json({ reply: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

// Fallback to index.html for any other requests (for single page app feel or just to ensure routing works)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Backend server listening at port ${port}`);
});
