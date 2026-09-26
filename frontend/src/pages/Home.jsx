import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Booking from "../components/Booking.jsx";
import FAQ from "../components/FAQ.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import AuthModal from "../components/AuthModal.jsx";

const Home = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openAuth = (targetMode) => {
    setMode(targetMode);
    setAuthOpen(true);
  };

  return (
    <>
      <Navbar
        onShowLogin={() => openAuth("login")}
        onShowRegister={() => openAuth("register")}
      />
      <Hero
        onShowLogin={() => openAuth("login")}
        onShowRegister={() => openAuth("register")}
      />
      <About />
      <Booking onRequireAuth={() => openAuth("login")} />
      <FAQ />
      <Contact />
      <Footer />
      <AuthModal
        isOpen={authOpen}
        mode={mode}
        setMode={setMode}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default Home;
