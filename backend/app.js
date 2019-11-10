const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const urlConnection = require('./db').mongoURI;
const cors = require('cors');

const users = require('./routes/user');
mongoose.connect(urlConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));


const app = express();

require('./passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static('public'));
app.use('/api/users', users);
// app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
