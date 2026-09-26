import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const formVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
};

const AuthModal = ({ isOpen, mode, setMode, onClose }) => {
  const { login, register, forgotPassword } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accept: false
  });
  const [forgetEmail, setForgetEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const resetStatus = () => setStatus({ type: "", message: "" });

  // Reset transient state whenever the modal closes
  useEffect(() => {
    if (!isOpen) {
      resetStatus();
      setSubmitting(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock page scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    resetStatus();
    setSubmitting(true);
    try {
      await login(loginForm.email, loginForm.password);
      setStatus({ type: "success", message: "Welcome back!" });
      setTimeout(onClose, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Login failed"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetStatus();
    if (!registerForm.accept) {
      setStatus({ type: "error", message: "Please accept the Terms & conditions" });
      return;
    }
    setSubmitting(true);
    try {
      await register(
        registerForm.firstName,
        registerForm.lastName,
        registerForm.email,
        registerForm.password
      );
      setStatus({ type: "success", message: "Account created!" });
      setTimeout(onClose, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Registration failed"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();
    resetStatus();
    setSubmitting(true);
    try {
      const data = await forgotPassword(forgetEmail);
      setStatus({ type: "success", message: data.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="form-box auth-modal-box"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="auth-close" onClick={onClose} aria-label="Close">
              <i className="bx bx-x"></i>
            </button>

            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.div key="login" variants={formVariants} initial="initial" animate="animate" exit="exit">
                  <div className="top">
                    <span>
                      Don't have an account?{" "}
                      <a href="#" onClick={(e) => { e.preventDefault(); setMode("register"); resetStatus(); }}>
                        Sign Up
                      </a>
                    </span>
                    <header>Login</header>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="input-box">
                      <input
                        type="email"
                        className="input-field"
                        placeholder="Email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                      <i className="bx bx-user"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <i className="bx bx-lock-alt"></i>
                    </div>
                    <div className="input-box">
                      <motion.input
                        type="submit"
                        className="submit"
                        value={submitting ? "Signing in..." : "Sign In"}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        disabled={submitting}
                      />
                    </div>
                    <div className="two-col">
                      <div className="one">
                        <input type="checkbox" id="login-check" />
                        <label htmlFor="login-check"> Remember Me</label>
                      </div>
                      <div className="two">
                        <label>
                          <a href="#" onClick={(e) => { e.preventDefault(); setMode("forget"); resetStatus(); }}>
                            Forgot password?
                          </a>
                        </label>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {mode === "register" && (
                <motion.div key="register" variants={formVariants} initial="initial" animate="animate" exit="exit">
                  <div className="top">
                    <span>
                      Have an account?{" "}
                      <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); resetStatus(); }}>
                        Login
                      </a>
                    </span>
                    <header>Sign Up</header>
                  </div>
                  <form onSubmit={handleRegister}>
                    <div className="two-forms">
                      <div className="input-box">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Firstname"
                          required
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                        />
                        <i className="bx bx-user"></i>
                      </div>
                      <div className="input-box">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Lastname"
                          required
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                        />
                        <i className="bx bx-user"></i>
                      </div>
                    </div>
                    <div className="input-box">
                      <input
                        type="email"
                        className="input-field"
                        placeholder="Email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      />
                      <i className="bx bx-envelope"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        required
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      />
                      <i className="bx bx-lock-alt"></i>
                    </div>
                    <div className="input-box">
                      <motion.input
                        type="submit"
                        className="submit"
                        value={submitting ? "Creating..." : "Register"}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        disabled={submitting}
                      />
                    </div>
                    <div className="two-col">
                      <div className="one">
                        <input
                          type="checkbox"
                          id="register-check"
                          checked={registerForm.accept}
                          onChange={(e) => setRegisterForm({ ...registerForm, accept: e.target.checked })}
                        />
                        <label htmlFor="register-check"> Accept Terms</label>
                      </div>
                      <div className="two">
                        <label>
                          <a href="#">Terms &amp; conditions</a>
                        </label>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {mode === "forget" && (
                <motion.div key="forget" variants={formVariants} initial="initial" animate="animate" exit="exit">
                  <div className="top">
                    <span>
                      Return to{" "}
                      <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); resetStatus(); }}>
                        Login
                      </a>
                    </span>
                    <header>Reset Password</header>
                  </div>
                  <form onSubmit={handleForget}>
                    <div className="input-box">
                      <input
                        type="email"
                        className="input-field"
                        placeholder="Enter your email"
                        required
                        value={forgetEmail}
                        onChange={(e) => setForgetEmail(e.target.value)}
                      />
                      <i className="bx bx-envelope"></i>
                    </div>
                    <div className="input-box">
                      <motion.input
                        type="submit"
                        className="submit"
                        value={submitting ? "Sending..." : "Send Reset Link"}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        disabled={submitting}
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
