import React, { useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorpage, setErrorpage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorpage("All fields are required");
      return;
    }

    try {
      // Sending a POST request using fetch
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("Registration successful");
        alert("Registration successful");
        navigate("/login");
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message);
    }
  };

  return (
    <section className="create-account mt-56 flex items-center justify-center">
      <div className="main-account flex items-center justify-center flex-col">
        <div className="creat">Create your account</div>

        <div className="input-section pt-10 flex flex-col items-center justify-center">
          <div>
            <div className="span">Username</div>
            <div className="input-field">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                placeholder="Enter Your Username"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="span">Email</div>
            <div className="input-field">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="span">Password</div>
            <div className="input-field">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                minLength="8"
                placeholder="Create Your Password"
                required
              />
            </div>
          </div>

          {error && <div className="error-message text-[red]">{error}</div>}
          {errorpage && (
            <div className="error-message text-[red]">{errorpage}</div>
          )}

          <div className="create-button pt-8">
            <button onClick={handleRegistration}>Create Account</button>

            <p className="alraeady mt-4 flex justify-center">
              Already have an account?
              <Link to={"/login"}>
                <span>Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
