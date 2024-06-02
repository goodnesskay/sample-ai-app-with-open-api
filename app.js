const express = require('express');
import OpenAI from 'openai';
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;
    try {
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 30,
          });
        res.json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    res.end('Hello World!');
});
