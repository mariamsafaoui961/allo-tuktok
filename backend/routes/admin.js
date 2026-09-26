import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import protect from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();
router.use(protect, admin);

router.get("/stats", async (req, res) => {
  try {
    const [users, bookings, pending, confirmed, cancelled, recentBookings] = await Promise.all([
      User.countDocuments(), Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "cancelled" }),
      Booking.find().populate("user", "firstName lastName email").sort({ createdAt: -1 }).limit(10)
    ]);
    res.json({ users, bookings, pending, confirmed, cancelled, recentBookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) { res.status(500).json({ message: "Server error" }); }
});

router.patch("/bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("user", "firstName lastName email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) { res.status(500).json({ message: "Server error", error: error.message }); }
});

export default router;
