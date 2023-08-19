import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiUserPlus, FiLogIn, FiHome, FiSearch, FiBell, FiMail, FiBookmark, FiList, FiUser, FiMoreHorizontal } from "react-icons/fi";
import "./navigation-sidebar.css";

const NavigationSidebar = ({ onClose }) => {
    const { currentUser } = useSelector((state) => state.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [active] = pathname.split("/");
    const [isOpen, setIsOpen] = useState(false);
    const links = [
    { name: "home", icon: <FiHome /> },
    { name: "search", icon: <FiSearch /> },
    { name: "notifications", icon: <FiBell /> },
    { name: "messages", icon: <FiMail /> },
    { name: "bookmarks", icon: <FiBookmark /> },
    { name: "lists", icon: <FiList /> },
    { name: "more", icon: <FiMoreHorizontal /> }
  ];

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
    onClose(false);
  };

  if (!currentUser) {
    links.push({ name: "login", icon: <FiLogIn /> });
    links.push({ name: "register", icon: <FiUserPlus /> });
  } else {
    links.push({ name: "profile", icon: <FiUser /> });
  }

  return (
    <div className="sidebar-container">
      <button
        className="toggle-sidebar"
        onClick={() => {
          setIsOpen(!isOpen);
          onClose(!isOpen);
        }}
        style={{ left: isOpen ? '260px' : '10px' }}
      >
        ☰
      </button>
      <div className={`list-group ${isOpen ? "open" : ""}`}>
        {links.map(({ name, icon }) => (
          <div
            className={`list-group-item text-capitalize ${active === name ? "active" : ""}`}
            onClick={() => handleLinkClick(`/${name}`)}
          >
            {icon} {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationSidebar;