import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // Change to email
  const [password, setPassword] = useState("");
  const [errorpage, setErrorpage] = useState("");
  const navigate = useNavigate();

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on submit

    // Basic validation for required fields
    if (!email) {
      setErrorpage("Email is required");
      return;
    } else if (!password) {
      setErrorpage("Password is required");
      return;
    }

    const data = { email, password }; // Pass email instead of username

    try {
      // Send a POST request to your backend API to handle user login
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // If login is successful, save the token and redirect
      if (response.ok) {
        console.log("Login successful");
        //alert("Login successful");
        localStorage.setItem("token", result.token);
        navigate("/");
        window.location.reload();
      } else {
        setErrorpage(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorpage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="create-account mt-40 flex items-center justify-center">
        <div className="main-account flex items-center justify-center flex-col">
          <div className="creat">Welcome back</div>

          <div className="input-section pt-10 flex flex-col items-center justify-center">
            <div>
              <div className="span">Email</div>
              <div className="input-field">
                <input
                  type="email"
                  required
                  value={email} // Use email here
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  placeholder="Enter Your Email"
                />
              </div>
            </div>
            <div className="mt-">
              <div className="span">Password</div>
              <div className="input-field">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  minLength="8"
                  required
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

            {errorpage && (
              <div className="error-message text-[red]">{errorpage}</div>
            )}

            <div className="create-button pt-2">
              <button onClick={handleLogin}>Log In</button>

              <p className="alraeady mt-4 flex justify-center">
                Don’t have an account?
                <Link to={"/signup"}>
                  <span>Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
