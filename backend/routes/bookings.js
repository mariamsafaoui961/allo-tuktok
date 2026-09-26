import express from "express";
import Booking from "../models/Booking.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/bookings   (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { name, email, people, time, date, phone } = req.body;

    if (!name || !email || !people || !time || !date || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      user: req.userId,
      name,
      email,
      people,
      time,
      date,
      phone
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/bookings/my   (protected)
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/bookings/:id   (protected - cancel own booking)
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
