import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#booking", label: "Booking" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" }
];

const Navbar = ({ onShowLogin, onShowRegister }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-logo">
        <p>Allo <span>TukTuk</span> 🛺</p>
      </div>

      <div className={`nav-menu ${open ? "show" : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          {user?.role === "admin" && (
            <li><Link to="/admin" className="link" onClick={() => setOpen(false)}>Admin Dashboard</Link></li>
          )}
          {user && (
            <li>
              <Link to="/my-bookings" className="link" onClick={() => setOpen(false)}>
                My Bookings
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="nav-button">
        {user ? (
          <>
            <span className="nav-greeting">Hi, {user.firstName}</span>
            <button className="btn white-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn white-btn" onClick={onShowLogin}>
              Sign In
            </button>
            <button className="btn" onClick={onShowRegister}>
              Sign Up
            </button>
          </>
        )}
      </div>

      <div className="nav-menu-btn" onClick={() => setOpen(!open)}>
        <i className="bx bx-menu"></i>
      </div>
    </motion.nav>
  );
};

export default Navbar;
