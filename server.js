const express = require('express');
const cors = require('cors');
const morgon = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const { connectDb } = require('./config/connectDb');
dotenv.config();

connectDb();
const app = express();

app.use(morgon('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/user', require('./routes/userRoute'));

//transection routes
app.use('/api/v1/transection', require('./routes/transectionRoutes'));

// port

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
