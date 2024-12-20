import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./passwordResetRequest.scss";

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
        }, 4000);
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-44 flex h-full relative pb-28">
      <div className="password-reset-request-page">
        <form onSubmit={handleSubmit}>
          <div className="input-section pt-10 flex flex-col">
            <div>
              <h1>Reset Your Password</h1>
              <label className="flex">Email</label>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-5 subscribe-plan w-full">
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
        {message && <p className="pt-2">{message}</p>}
      </div>
    </section>
  );
};

export default PasswordResetRequest;
