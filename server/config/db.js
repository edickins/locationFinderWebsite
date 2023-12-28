const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

let MONGO_URI;
if (process.env.NODE_ENV === 'development') {
  MONGO_URI = process.env.LOCAL_URI;
} else {
  MONGO_URI = process.env.PRODUCTION_URI;
}

module.exports = connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  });
  console.log(`mongoDB connected ${conn.connection.host}`.cyan.underline.bold);
};
