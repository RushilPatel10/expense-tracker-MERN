const express = require('express');
const cors = require('cors');
const morgon = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const { connectDb } = require('./config/connectDb');
const transectionRoutes = require('./routes/transectionRoutes')
dotenv.config();

connectDb();
const app = express();

app.use(morgon('dev'));
app.use(cors());
app.use(express.json());

// Add debug middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// routes
app.use('/api/v1/user', require('./routes/userRoute'));

//transection routes
app.use('/api/v1/transection', transectionRoutes);

// Add a catch-all route to help debug 404s
app.use('*', (req, res) => {
    console.log('404 hit for URL:', req.originalUrl);
    res.status(404).json({
        message: 'Route not found',
        requestedUrl: req.originalUrl
    });
});

// port

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
