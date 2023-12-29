const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');

// load env vars
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5001;

const connectDB = require('./config/db');
connectDB();

/*routes*/
const locations = require('./routes/locations');
const facilities = require('./routes/facilities');
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://locationfinder.bleepbloop.net'
    ]
  })
);

// body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/locations', locations);
app.use('/api/v1/facilities', facilities);
app.use(errorHandler);

let server = undefined;

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync(
      '/srv/locationfinder.bleepbloop.net/config/ssl/current/ssl.key'
    ),
    cert: fs.readFileSync(
      '/srv/locationfinder.bleepbloop.net/config/ssl/current/ssl.crt'
    )
  };

  server = https
    .createServer(options, app)
    .listen(PORT, () =>
      console.log(
        `server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
      )
    );
} else {
  server = http
    .createServer(app)
    .listen(
      PORT,
      console.log(
        `server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
      )
    );
}

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
