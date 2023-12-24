const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

// load env vars
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5001;

const connectDB = require('./config/db');
connectDB();

/*routes*/
const locations = require('./routes/locations');
const app = express();

// body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
  )
);

app.use('/api/v1/locations', locations);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
