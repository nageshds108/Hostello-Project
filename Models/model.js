const mongoose = require('mongoose');
const Review = require('./reviews');
const { ref } = require('joi');
const Schema =  mongoose.Schema

const userSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price:{
        type: Number,
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "Maharashtra"
    },
    amenities: [{
        type: String,
    }],
    contactNo: {
        type: String,
        required: true
    },
    hostelType: {
        type: String,
        enum: ['Male', 'Female', 'Coed'],
        required: true
    },
    bedSharing: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

}); 

userSchema.post("findOneAndDelete", async function(listing){
    if(listing){
         await Review.deleteMany({_id: {$in: listing.reviews}})
    }});


let Listings= mongoose.model('Listing', userSchema);


module.exports = Listings;
