const mongoose = require('mongoose');
const Listings = require('../Models/model.js'); 
const init = require('./data.js');

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Hotello');
}

const initDB = async () => {
  await Listings.deleteMany({});
  
  const ObjectId = mongoose.Types.ObjectId;
  init.data = init.data.map(obj => ({
    ...obj,
    owner: new ObjectId("68f49c52010281cb54637ec6")
  }));

  await Listings.insertMany(init.data);
  console.log("Database Initialized with Sample Data");
};

initDB();
