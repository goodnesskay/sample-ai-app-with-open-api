const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());

app.post('/api/v1/chat', async (req, res) => {
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
});

app.get('/', (req, res) => {
    res.send('Sample AI app with Node and Open AI by Goodness Kayode');
});
