const express = require('express');
require('dotenv').config();
const {calculate_price} = require('./predictor');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT ?? 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.post('/predict', (req, res) => {
    (async ()=>{
        let price = await calculate_price(req.body) * 100000;
        res.send('Price = '+price);
    })();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});