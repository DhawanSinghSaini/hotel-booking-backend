const mongoose = require('mongoose');
const { Hotel } = require('./models'); // Import only the Hotel model
const connectDB = require('../db');

async function addHotels() { // Changed function name to reflect hotels only
  try {
    // Connect to the database
    await connectDB();

    // Array of hotel data with image URLs
    const hotelsData = [
      {
        name: 'Luxury Grand Hotel',
        place: 'New York',
        description: 'Experience unparalleled luxury in the heart of the city.',
        imageUrls: [
          'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Coastal Resort',
        place: 'Miami',
        description: 'Escape to a serene beachfront oasis with breathtaking views.',
        imageUrls: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Mountain View Retreat',
        place: 'Aspen',
        description: 'Discover tranquility amidst stunning mountain scenery.',
        imageUrls: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'City Center Hotel',
        place: 'Boston',
        description: 'Conveniently located in the heart of the city.',
        imageUrls: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Beachfront Villa',
        place: 'San Diego',
        description: 'Luxurious villa with private beach access.',
        imageUrls: [
          'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Ski Lodge',
        place: 'Chicago',
        description: 'Cozy lodge near the ski slopes.',
        imageUrls: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Historic Inn',
        place: 'Denver',
        description: 'Charming inn with a rich history.',
        imageUrls: [
          'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Desert Oasis Resort',
        place: 'Hawaii',
        description: 'Relax in a luxurious desert setting.',
        imageUrls: [
          'https://images.unsplash.com/photo-1554009975-d74653b879f1?q=80&w=2265&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Seaside Cottage',
        place: 'Portland',
        description: 'Cozy cottage with stunning ocean views.',
        imageUrls: [
          'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=3159&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        name: 'Urban Hotel',
        place: 'Mumbai',
        description: 'Stylish hotel in the heart of the city.',
        imageUrls: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]
      },
      {
          name: 'Mountain Escape',
          place: 'Banff',
          description: 'A rustic retreat in the Canadian Rockies.',
          imageUrls: [
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      },
      {
          name: 'Tropical Paradise',
          place: 'Bali',
          description: 'Experience the beauty of Bali.',
          imageUrls: [
            'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      },
      {
          name: 'City Center Suites',
          place: 'London',
          description: 'Luxury suites in central London.',
          imageUrls: [
             'https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      },
      {
          name: 'Beachfront Bungalow',
          place: 'Maldives',
          description: 'Relax in your private bungalow on the beach.',
          imageUrls: [
            'https://images.unsplash.com/photo-1678913308053-316cee77afe9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      },
      {
          name: 'Historic Manor',
          place: 'Edinburgh',
          description: 'Stay in a beautifully preserved historic manor.',
          imageUrls: [
              'https://images.unsplash.com/photo-1698752822280-8a1b285a7709?q=80&w=3130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      },
      {
          name: 'Luxury Spa Resort',
          place: 'Fiji',
          description: 'Indulge in a relaxing spa experience.',
          imageUrls: [
              'https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
      },
      {
          name: 'Mountain Cabin',
          place: 'Switzerland',
          description: 'Cozy cabin with stunning mountain views.',
          imageUrls: [
             'https://images.unsplash.com/photo-1611151394056-319824d98c09?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
      },
       {
          name: 'Harbor Hotel',
          place: 'Sydney',
          description: 'Beautiful hotel overlooking the harbor.',
          imageUrls: [
             'https://images.unsplash.com/photo-1549875648-357fef68fec7?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
      },
      {
          name: 'Skyhigh Hotel',
          place: 'Delhi',
          description: 'Experience the grandeur of India.',
          imageUrls: [
              'https://images.unsplash.com/photo-1598598795009-f80c5072e665?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ]
      },
      {
          name: 'Waterfront Resort',
          place: 'Cape Town',
          description: 'Luxury resort on the waterfront.',
          imageUrls: [
              'https://images.unsplash.com/photo-1493711662062-fa57417b9e4d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]
      }
    ];

    // Create hotels
    for (const hotelData of hotelsData) {
      const hotel = new Hotel(hotelData);
      await hotel.save();
    }

    console.log('Hotels added successfully!');
  } catch (error) {
    console.error('Error adding hotels:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Run the function to add data
addHotels(); // Changed function call
