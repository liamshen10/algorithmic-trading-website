import { BrowserRouter } from "react-router-dom";
import { useState } from 'react';
import { Routes, Route } from "react-router";
import RegisterScreen from "./register-page/registration-screen";
import authReducer from "./reducers/auth-reducer";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // import your newly created CSS file

import NavigationSidebar from "./navigation/navigation";
import LoginScreen from "./login-page/login-screen";

const store = configureStore({ reducer: { user: authReducer } });

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Initialize as closed

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="row">
          <div>
            <NavigationSidebar onClose={setSidebarOpen} />
          </div>
          <div className={`main-content ${isSidebarOpen ? "expanded" : "centered"}`}>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;