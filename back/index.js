const axios = require('axios');
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai')
const cors = require("cors");



const app = express();
const PORT = 5000;
// Replace with your actual DeepSeek API endpoint and API key
const DEEPSEEK_API_URL = 'https://api.deepseek.com';
const API_KEY = 'AIzaSyC7O5rhCqPDagnZQ4ozrwbdFVACyPDIzPE';
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
app.use(cors());
app.use(express.json()); 
// Example function to call the DeepSeek API

// async function callDeepSeekAPI() {
//     try {
//         const response = await axios.post(DEEPSEEK_API_URL, {
//             // Your request payload here
//             prompt: "Hello, DeepSeek!",
//             max_tokens: 50
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Response from DeepSeek API:', response.data);
//     } catch (error) {
//         console.error('Error calling DeepSeek API:', error.response ? error.response.data : error.message);
//     }
// }

app.post('/prompt', async (req, res) => {
    const { height, weight, goal, exerciseFrequency, dietPreference, otherRestrictions } = req.body;

    // Construct the prompt for Gemini
    let prompt = `Create a diet and lifestyle plan considering the following:
    Height: ${height} cm
    Weight: ${weight} kg
    Goal: ${goal} (e.g., lose 15 kg, gain muscle, maintain weight)
    Exercise Frequency: ${exerciseFrequency} (e.g., 3 times a week)
    Dietary Preference: ${dietPreference} (e.g., Mediterranean, vegetarian, vegan) json format`;
    

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // const structuredData = JSON.parse(responseText);
        // console.log(structuredData)
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});