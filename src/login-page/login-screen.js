import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../services/auth-thunks";
import "./login-screen.css";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(login({ username, password }));
      if (login.rejected.match(resultAction)) {
        throw new Error('Login failed');
      }
  
      navigate("/profile");
    } catch (e) {
      alert('Incorrect username or password');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center">Login</h1><br/>
            <div className="mt-4">
              <label htmlFor="username">Username</label>
              <input className="form-control" id="username" type="text" value={username}
                onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" type="password" value={password}
                onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
            </div>
            <button className="btn btn-primary mt-4 w-100"
              onClick={handleLogin}>
              Login
            </button>
            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-secondary">Forgot Password?</a>
            </div>
            <div className="text-center mt-1">
              <a href="/register" className="text-secondary">Not a member? Register</a>
            </div>
            <div className="text-center mt-3">
              <a href="/home" className="text-secondary">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;