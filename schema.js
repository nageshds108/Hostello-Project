const Joi = require("joi");
const reviews = require("./Models/reviews");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("",null),
    location: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    amenities: Joi.array().items(Joi.string()),
    contactNo: Joi.string().required(),
    hostelType: Joi.string().valid('Male', 'Female', 'Coed').required(),
    bedSharing: Joi.string().required(),
  }).required()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
    }).required()
});


module.exports = {listingSchema, reviewSchema };
