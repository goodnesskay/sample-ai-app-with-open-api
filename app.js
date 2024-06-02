const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: userInput,
            max_tokens: 150,
        });
        res.json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
