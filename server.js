const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./middleware/error');

const app = express();

const auth = require('./routes/auth');

// Use Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
