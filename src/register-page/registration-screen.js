import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { register } from "../services/auth-thunks";
import "./registration-screen.css";

function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(""); // Added new state for email
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!role) {
      alert("Please select a role");
      return;
    }
    try {
      const resultAction = await dispatch(register({ username, password, email, role })); // Include email in the register action
      if (register.rejected.match(resultAction)) {
        throw new Error('Registration failed');
      }
      navigate("/profile");
    } catch (e) {
      alert('Username already exists');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-30">
          <div className="card p-4">
            <h1 className="text-center">Registration</h1><br/>
            <div className="mt-4">
              <label htmlFor="username">Username</label>
              <input className="form-control" id="username" type="text" value={username}
                onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input className="form-control" id="email" type="email" value={email}
                onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" type="password" value={password}
                onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input className="form-control" id="confirmPassword" type="password" value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your password" />
            </div>
            <div className="mt-4">
              <label htmlFor="userType">I am an:</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="userType" id="admin" value="administrator"
                  onChange={(event) => setRole(event.target.value)} />
                <label className="form-check-label" htmlFor="admin">
                  Administrator
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="userType" id="reviewer" value="reviewer"
                  onChange={(event) => setRole(event.target.value)} />
                <label className="form-check-label" htmlFor="reviewer">
                  Reviewer
                </label>
              </div>
            </div>
            <button className="btn btn-primary mt-4 w-100"
              onClick={handleRegister}>
              Register
            </button>
            <div className="text-center mt-3">
              <a href="/" className="text-secondary">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
