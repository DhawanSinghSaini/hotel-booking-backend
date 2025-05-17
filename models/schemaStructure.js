const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String }], // Array of image URLs
});

// Room Schema (Hardcoded room types)


const roomSchema = new mongoose.Schema({
    roomType: {
      type: String,
      required: true,
      enum: ["Grand Suite", "Elite Suite", "Silver Suite", "Executive Suite"], // Added enum validation
    },
    description: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      enum: [2, 3, 4, 6],
    },
    bedType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
    imageUrl: {  // Added imageUrl field
      type: String,
      required: false, // Make it optional
    },
  });


// Booking Schema
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    roomType: { type: String, required: true }, // Store the room type
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
});

module.exports = {
    hotelSchema: hotelSchema,
    roomSchema: roomSchema,
    bookingSchema: bookingSchema,
    userSchema: userSchema
};