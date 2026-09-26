import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-header">
        <Link to="/" className="back-link">&larr; Back home</Link>
        <h1>My Bookings</h1>
        <p>Welcome, {user?.firstName}. Here's every ride you've booked with us.</p>
      </div>

      {loading ? (
        <p className="page-loader">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="empty-state">No bookings yet. Go book your first ride!</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              className={`booking-card status-${booking.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="booking-card-top">
                <span className={`badge badge-${booking.status}`}>{booking.status}</span>
                <span>{booking.date} · {booking.time}</span>
              </div>
              <h3>{booking.name}</h3>
              <p>{booking.people} people · {booking.phone}</p>
              <p>{booking.email}</p>
              {booking.status !== "cancelled" && (
                <button onClick={() => cancelBooking(booking._id)}>Cancel booking</button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
