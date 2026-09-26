import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I create an account?",
    a: "Click on the \"Sign Up\" button in the top navigation or on the homepage. Fill in your details including first name, last name, email address and create a password."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, MasterCard, American Express), and mobile payment options. All transactions are securely processed."
  },
  {
    q: "How can I cancel or reschedule my booking?",
    a: "Log into your account, go to \"My Bookings\", and cancel from there. Cancellations made more than 24 hours in advance receive a full refund."
  },
  {
    q: "What safety measures do you have in place?",
    a: "All our drivers undergo thorough background checks. We provide sanitization kits and require all partners to follow strict hygiene protocols."
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes! For groups of 5 or more, we offer a 15% discount. Contact our sales team for customized solutions."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="section-subtitle">Find answers to common questions about Allo TukTuk</p>

        <div className="faq-container">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.q}
                className={`faq-item ${isOpen ? "active" : ""}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="faq-question" onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <h3>{item.q}</h3>
                  <motion.i
                    className="bx bx-chevron-down"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                  ></motion.i>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="faq-contact">
          <p>
            Still have questions? <a href="#contact">Contact our support team</a> and we'll be
            happy to help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
