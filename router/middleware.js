const Listings = require('../Models/model.js');
const Review = require('../Models/reviews.js');
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utilis/ExpressError.js");

module.exports.saveURL = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash('error', 'Signin to proceed!');
        return res.redirect('/login');
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    if (req.body?.listing) {
        if (!req.body.listing.amenities) {
            req.body.listing.amenities = [];
        } else if (!Array.isArray(req.body.listing.amenities)) {
            req.body.listing.amenities = [req.body.listing.amenities];
        }
    }
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash('error', 'You do not have permission!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};
