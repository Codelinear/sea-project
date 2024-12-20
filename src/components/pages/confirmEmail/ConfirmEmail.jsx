import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ConfirmEmail.scss";

const ConfirmEmail = () => {
  const [confirmationStatus, setConfirmationStatus] = useState("loading");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Extract the token from the query string
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
          setConfirmationStatus("invalid");
          return;
        }

        // Send the token to the backend for verification
        const response = await fetch("/auth/confirm-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message === "Email confirmed successfully!") {
            setConfirmationStatus("success");
          } else {
            setConfirmationStatus("error");
          }
        } else {
          const errorData = await response.json();
          console.error("Error confirming email:", errorData);
          setConfirmationStatus("error");
        }
      } catch (error) {
        console.error("Error confirming email:", error);
        setConfirmationStatus("error");
      }
    };

    confirmEmail();
  }, [location.search]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <section className="mt-44 flex items-center justify-center h-full relative pb-28">
      <div className="confirm-email-page">
        {confirmationStatus === "loading" && (
          <p>Confirming your email address, please wait...</p>
        )}
        {confirmationStatus === "success" && (
          <div className="success pb-20">
            <h1>Email Confirmed!</h1>
            <p className="mt-6">
              Your email has been successfully verified. <br />
              You can now log in.
            </p>
            <div className="subscribe-plan w-full">
              <button onClick={handleLoginRedirect}>Log In</button>
            </div>
          </div>
        )}
        {confirmationStatus === "error" && (
          <div className="error pb-20">
            <h1>Confirmation Failed</h1>
            <p className="mt-6">
              There was an issue confirming your email. <br />
              The link may have expired or is invalid.
            </p>
          </div>
        )}
        {confirmationStatus === "invalid" && (
          <div className="invalid pb-20">
            <h1>Invalid Link</h1>
            <p className="mt-6">The confirmation link is missing or invalid.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConfirmEmail;
