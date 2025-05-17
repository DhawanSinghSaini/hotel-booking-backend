const mongoose = require('mongoose');
const { Room } = require('../models'); // Import the Room model
const connectDB = require('../db');

async function addRooms() {
  try {
    // Connect to the database
    await connectDB();

    // Array of room data
    const roomsData = [
      {
        roomType: "Grand Suite",
        description: "A premium room for two, featuring modern elegance and exclusive amenities.",
        capacity: 2,
        bedType: "Double Bed",
        price: 15000,
        availability: 10,
        imageUrl: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHwy"
      },
      {
        roomType: "Elite Suite",
        description: "A stylish room for three, offering superior comfort and contemporary design.",
        capacity: 3,
        bedType: "Triple Bed",
        price: 19000,
        availability: 8,
        imageUrl: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8Mg%3D%3D"
      },
      {
        roomType: "Silver Suite",
        description: "An opulent suite designed for families, providing spacious luxury and privacy.",
        capacity: 4,
        bedType: "King Size Bed",
        price: 25000,
        availability: 5,
        imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZHJvb218ZW58MHx8MHx8fDI%3D"
      },
      {
        roomType: "Executive Suite",
        description: "A lavish suite with majestic interiors and premium facilities, perfect for larger groups.",
        capacity: 6,
        bedType: "Two King Size Beds",
        price: 30000,
        availability: 3,
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    // Insert the room data
    const insertedRooms = await Room.insertMany(roomsData);
    console.log('Rooms added successfully:', insertedRooms);

  } catch (error) {
    console.error('Error adding rooms:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Run the function to add room data
addRooms();
