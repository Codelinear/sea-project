import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorpage, setErrorpage] = useState("");
  const navigate = useNavigate();

  // Function to handle token refresh
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/auth/refresh-token", {
        method: "POST",
        credentials: "include", // Include cookies to handle refresh tokens if they're stored in cookies
      });
      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token);
        return result.token;
      } else {
        // Handle the case where the refresh token is invalid/expired
        console.error("Failed to refresh token");
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorpage("Email is required");
      return;
    } else if (!password) {
      setErrorpage("Password is required");
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem("token", result.accessToken); // Store access token
        localStorage.setItem("refreshToken", result.refreshToken); // Store refresh token if needed
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default Login;
