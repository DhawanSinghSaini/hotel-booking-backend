const mongoose = require('mongoose');
const {
  hotelSchema,
  roomSchema,
  bookingSchema,
  userSchema,
} = require('./schemaStructure');

const Hotel = mongoose.model('Hotel', hotelSchema);
const Room = mongoose.model('Room', roomSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Hotel, Room, Booking, User };