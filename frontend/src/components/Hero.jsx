import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const Hero = forwardRef(({ onShowLogin, onShowRegister }, ref) => {
  const { user } = useAuth();

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="wrapper" ref={ref}>
      <motion.div
        className="blob hero-blob-1"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob hero-blob-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob hero-blob-3"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="tuktuk-road">
        <span className="tuktuk-drive" aria-hidden="true">🛺</span>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {user ? (
          <>
            <h1>Welcome back, {user.firstName} 👋</h1>
            <p>Your next ride is just a tap away. Scroll down to book a tuk-tuk.</p>
            <div className="hero-actions">
              <motion.button
                className="btn"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={scrollToBooking}
              >
                Book a Ride
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1>
              Allo <span>TukTuk</span> 🛺
            </h1>
            <p>Fast, fun and affordable tuk-tuk rides around town — sign in and book your seat in seconds.</p>
            <div className="hero-actions">
              <motion.button
                className="btn"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={onShowRegister}
              >
                Get Started
              </motion.button>
              <motion.button
                className="btn white-btn"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={onShowLogin}
              >
                Sign In
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
});

export default Hero;
