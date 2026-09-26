import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import bookingIcon from "../assets/booking-icon.png";

const initialForm = { name: "", email: "", people: "", time: "", date: "", phone: "" };

const Booking = ({ onRequireAuth }) => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!user) {
      onRequireAuth();
      setStatus({ type: "error", message: "Please sign in first to book a ride." });
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/bookings", form);
      setStatus({ type: "success", message: "Booking confirmed! We'll see you soon." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Could not create booking"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="main_bg">
      <motion.div
        className="blob hero-blob-1"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob hero-blob-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="form"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="form-text">
          <h1>
            <span><img src={bookingIcon} alt="icon" width="40" /></span> Book Now
          </h1>
          <p>Fill out the form below to book your tuk-tuk ride.</p>
        </div>
        <div className="main-form">
          <form onSubmit={handleSubmit}>
            <div>
              <span>Your full name?</span>
              <input
                type="text"
                name="name"
                placeholder="Write your name here..."
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Your email address?</span>
              <input
                type="email"
                name="email"
                placeholder="Write your email here..."
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>How many people?</span>
              <select name="people" required value={form.people} onChange={handleChange}>
                <option value="">-- Select --</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
              </select>
            </div>
            <div>
              <span>What time?</span>
              <input type="time" name="time" required value={form.time} onChange={handleChange} />
            </div>
            <div>
              <span>What is the date?</span>
              <input type="date" name="date" required value={form.date} onChange={handleChange} />
            </div>
            <div>
              <span>Your phone number?</span>
              <input
                type="tel"
                name="number"
                placeholder="Write your number here..."
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div id="submit">
              <motion.input
                type="submit"
                value={submitting ? "Booking..." : "SUBMIT"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                disabled={submitting}
              />
            </div>
          </form>

          <AnimatePresence>
            {status.message && (
              <motion.p
                key={status.message}
                className={`form-status ${status.type}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {status.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Booking;
