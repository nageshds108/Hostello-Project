const Listings = require('../Models/model.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Token =  process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: Token });

function buildGeocodeQuery(listingData = {}) {
    const parts = [listingData.address, listingData.location, listingData.state]
        .map((part) => (part || "").trim())
        .filter(Boolean);
    return parts.join(", ");
}

module.exports.index=async (req, res) => {
    const searchQuery = (req.query.search || "").trim();
    const filter = {};

    if (searchQuery) {
        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = [
            { title: { $regex: escapedQuery, $options: "i" } },
            { location: { $regex: escapedQuery, $options: "i" } },
            { address: { $regex: escapedQuery, $options: "i" } },
            { description: { $regex: escapedQuery, $options: "i" } },
        ];
    }

    const listings = await Listings.find(filter);
    res.render('listing/listings', { listings, searchQuery });
}
module.exports.newListing=async (req, res) => {
    res.render('listing/New.ejs');
}
module.exports.renderLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findById(id).populate({
            path: 'reviews',          
            populate: {                
                path: 'author'         
            }}).populate('owner')
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    res.render('listing/show', { listing });
}
module.exports.createLis=async(req, res) => {
    const geocodeQuery = buildGeocodeQuery(req.body.listing);

    let coordinates = await geocodingClient.forwardGeocode({
  query: geocodeQuery,
  limit: 1
})
  .send()

    if (!coordinates.body.features.length) {
        req.flash('error', 'Unable to find this address on map. Please check address, location and state.');
        return res.redirect('/listings/new');
    }

    url=req.file.path;
    filename=req.file.filename;
    const newListing = new Listings(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
    newListing.geometry=coordinates.body.features[0].geometry;
    await newListing.save();
    req.flash('success', 'New Listing Added Successfully!');
    res.redirect(`/listings/${newListing._id}`);
}
module.exports.editLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    let ImgURL = listing.image.url;
    ImgURL = ImgURL.replace("upload", "upload/h_150,w_250");
    res.render('listing/edit.ejs', { listing, ImgURL });
}
module.exports.updateLis=async (req, res) => {
    const { id } = req.params;
    const geocodeQuery = buildGeocodeQuery(req.body.listing);
    let newGeometry = null;

    if (geocodeQuery) {
        const coordinates = await geocodingClient.forwardGeocode({
      query: geocodeQuery,
      limit: 1
    })
      .send();

        if (coordinates.body.features.length) {
            newGeometry = coordinates.body.features[0].geometry;
        }
    }

    const updateData = { ...req.body.listing };
    if (newGeometry) {
        updateData.geometry = newGeometry;
    }

    const listing = await Listings.findByIdAndUpdate(id, updateData, { runValidators: true, new: true });
    if(typeof req.file !== 'undefined'){
    url=req.file.path;
    filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }

    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Updated Successfully!');
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findByIdAndDelete(id);
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Deleted Successfully!');
    res.redirect('/listings');
}
