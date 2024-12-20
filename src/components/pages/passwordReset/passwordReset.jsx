import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PasswordReset = () => {
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
    } else {
      setMessage(data.message);
    }
  };

  return (
    <section className="pt-40 pb-40">
      <div>
        <h2>Enter New Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default PasswordReset;
