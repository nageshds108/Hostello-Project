# Hostello

Hostello is a full-stack hostel listing and review web application built with Node.js, Express, MongoDB, and EJS. It lets users browse hostels, add their own listings, upload hostel images, and manage reviews, with hostel-specific details such as hostel type, bed sharing, amenities, contact number, and map-based location.

Live demo: https://major-project-1-jaro.onrender.com/listings

## ⚙️ How It Works
1. Users sign up or log in to access protected actions.
2. Authenticated users create hostel listings with details, image upload, and location info.
3. Listing addresses are geocoded through Mapbox and shown on the map in the listing page.
4. Owners can edit or delete only their own listings.
5. Logged-in users can view each listing post reviews and ratings, and review authors can delete their own reviews.
6. All inputs are validated on the server, and flash messages show success or error feedback.

## ✨ Features

### User Authentication
- Secure signup and login using Passport.js
- Session management with express-session
- Password encryption

### Listing Management
- Create new property listings
- Edit existing listings (owner only)
- Delete listings (owner only)
- View all listings with details
- Image upload to Cloudinary

### Review System
- Add reviews with ratings (1-5 stars)
- Delete reviews (author only)
- Reviews linked to specific listings

### Geolocation
- Interactive maps using Mapbox
- Automatic geocoding of property locations

### Authorization & Validation
- Middleware-based route protection
- Server-side validation using Joi
- Owner and author verification

## 🛠️ Technologies Used

### Backend
- Node.js - Runtime environment
- Express.js - Web application framework
- MongoDB - Database
- Mongoose - ODM for MongoDB

### Authentication & Security
- Passport.js - Authentication middleware
- passport-local - Local authentication strategy
- express-session - Session management
- connect-mongo - MongoDB session store

### File Upload & Storage
- Multer - File upload handling
- Cloudinary - Cloud-based image storage

### Validation
- Joi - Schema validation

### Mapping
- Mapbox SDK - Geocoding and maps

### Templating
- EJS - Template engine
- ejs-mate - Layout support for EJS

## 🎨 Features in Detail

### Image Upload
- Images are uploaded to Cloudinary
- Automatic image transformation for thumbnails
- Secure storage with unique filenames

### Flash Messages
- Success and error messages using connect-flash
- User-friendly feedback for all operations

### Error Handling
- Custom error class (ExpressError)
- Centralized error handling middleware
- User-friendly error pages

## 🌐 Deployment
This application is deployed on Render.com.
