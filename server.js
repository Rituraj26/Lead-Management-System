const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./middleware/error');

const app = express();

const auth = require('./routes/auth');
const leads = require('./routes/leads');

// Use Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/auth', auth);
app.use('/leads', leads);

app.use(errorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
