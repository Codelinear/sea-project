import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./passwordReset.scss";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Password reset successful. You can now log in.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after success
      }, 4000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <section className="mt-44 flex h-full relative pb-28">
      <div className="password-reset-page">
        <h1>Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex">New Password</label>
          <div className="input-field">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
            />
          </div>
          <div className="pt-5 subscribe-plan w-full">
            <button type="submit">Update Password</button>
          </div>
        </form>
        {message && <p className="pt-2">{message}</p>}
      </div>
    </section>
  );
};

export default PasswordReset;
