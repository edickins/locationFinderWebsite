const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load environmental variables
dotenv.config({ path: './config/config.env' });

// load models
const Location = require('./models/Location');
const Facility = require('./models/Facility');

let MONGO_URL = undefined;
if (process.env.NODE_ENV === 'development') {
  MONGO_URL = process.env.LOCAL_URI;
} else {
  MONGO_URL = process.env.PRODUCTION_URI;
}

// connect to DB
mongoose.connect(MONGO_URL);

// read JSON files
const locations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/seedLocationData.json`, 'utf-8')
);

const facilities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/seedFacilitiesData.json`, 'utf-8')
);

// import into DB
const importData = async () => {
  try {
    await Location.create(locations);
    await Facility.create(facilities);
    console.log('Location Data imported.'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Location.deleteMany();
    await Facility.deleteMany();
    console.log('Location Data deleted.'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// handle the operations being run through the CLI
if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-d') {
  deleteData();
}
