const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const database = require('./helpers/mongodb');

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const recipeRouter = require('./routes/recipeRoutes');


const app = express();


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/recipe', recipeRouter);


// Loads .env file contents into process.env
dotenv.config()

// Connect to database
database()


module.exports = app;
