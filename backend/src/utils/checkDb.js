const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDb = require('../config/db');

dotenv.config({ path: './.env' });

const checkDb = async () => {
  try {
    await connectDb();
    console.log('Database connection successful');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

checkDb();
