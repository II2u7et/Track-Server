require('./models/User');
require('./models/Track');
const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const mongoUri = 'mongodb+srv://admin:Password@cluster0.cl2of.mongodb.net/<dbname>?retryWrites=true&w=majority';
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// to run use cmd line: npm run dev
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

app.get('/', requireAuth, (req,res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})