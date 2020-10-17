const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const app = express();

connectDB.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connectDB.threadId);
});

const auth = require('./routes/auth');

// Use Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/auth', auth);

// app.use(errorHandler());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
