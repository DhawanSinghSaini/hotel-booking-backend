

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ['Elite Double', 'Grand Suite', 'Luxury Family Suite', 'Royal Executive Suite'], // Updated options
        required: true
    },
    description: { type: String, required: true },
    capacity: {
        type: Number,
        enum: [2, 3, 4, 6], // Valid capacity values
        required: true
    },
    bedType: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, default: 0 }, // Default availability value
});
