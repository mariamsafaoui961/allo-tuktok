import { motion } from "framer-motion";
import aboutImg from "../assets/about.png";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="content-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="title">ABOUT US</div>
          <div className="content">
            <p>
              At Allo TukTuk, we're passionate about delivering high-quality rides that make a
              difference.
              <br />
              Founded on the principles of innovation, integrity, and customer satisfaction, we
              strive to exceed expectations in everything we do.
              <br />
              Our team is made up of dedicated drivers and staff who bring expertise and
              enthusiasm to every trip, ensuring that our riders receive the best possible
              experience.
              <br />
              Whether you're here to explore, commute, or travel with us, we're excited to have
              you on this journey.
            </p>
            <div className="button">
              <a href="#booking">Book a Ride</a>
            </div>
          </div>
          <div className="social">
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-instagram"></i></a>
            <a href="#"><i className="bx bxl-twitter"></i></a>
          </div>
        </motion.div>

        <motion.div
          className="image-section"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <img src={aboutImg} alt="about Allo TukTuk" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
