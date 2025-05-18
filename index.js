const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth");
const authenticateToken = require("./authMiddleware");
require("dotenv").config();
const { Hotel, Room, Booking } = require("./models/models"); // Import Booking model

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

// **Fetch All Hotels**
app.get("/hotels", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **Fetch Hotel by ID**
app.get("/hotels/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(hotel);
    } catch (error) {
        console.error("Error fetching hotel details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **Fetch All Rooms**
app.get("/rooms", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **Fetch Room by ID**
app.get("/rooms/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **POST Request - Create Booking**
app.post("/bookings", authenticateToken, async (req, res) => {
    console.log(req.body);
    try {
        const { hotel, roomType, checkInDate, checkOutDate, numberOfGuests, totalPrice } = req.body;

        if (!hotel || !roomType || !checkInDate || !checkOutDate || numberOfGuests <= 0 || totalPrice <= 0) {
            return res.status(400).json({ message: "Invalid booking data" });
        }

        const newBooking = new Booking({
            user: req.user.userId, // Extracted from JWT token
            hotel,
            roomType,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalPrice,
            status: "Pending"
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful", booking: newBooking });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **Fetch Bookings by User ID**
app.get("/bookings/:userId", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId }).populate("hotel").exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **DELETE Request - Remove Booking by ID**
app.delete("/bookings/:bookingId", authenticateToken, async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Ensure the logged-in user is the owner of the booking
        if (booking.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own bookings" });
        }

        await Booking.findByIdAndDelete(bookingId);
        res.json({ message: "Booking deleted successfully" });

    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// **Root Route**
app.get("/", (req, res) => {
    res.send("Welcome to the Hotel Booking API");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
