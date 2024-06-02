const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const fileDownloader = require('./src/utils/download');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());

app.post('/api/v1/chat', async (req, res) => {
    const userInput = req.body.message;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    "role": "user", 
                    "content": userInput 
                }
            ]
        });
        res.json({ message: response.choices[0].message });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/v1/transcription/create', async (req, res) => {
    // const userInput = req.body.audioFile;
    
    try {
        const response = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: fs.createReadStream('./src/uploads/Free_Test_Data_1M3.mp3'),
        });
        res.json({ message: response });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Sample AI app with Node and Open AI by Goodness Kayode');
});
