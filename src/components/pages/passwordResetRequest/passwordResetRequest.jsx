import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000);
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-40 pb-40">
      <div className="password-reset">
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default PasswordResetRequest;
