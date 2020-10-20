const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const mongoUri = 'mongodb+srv://admin:Password@cluster0.cl2of.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance');
})

mongoose.connection.on('error', (err) => {
    console.err('Error connecting to Mongo instance', err);
})

app.get('/', (req,res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})