import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";  
import { FiUserPlus, FiLogIn, FiHome, FiSearch, FiBell, FiMail, FiBookmark, FiList, FiUser, FiMoreHorizontal } from "react-icons/fi";

const NavigationSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [active] = pathname.split("/");
  const links = [
    { name: "home", icon: <FiHome /> },
    { name: "explore", icon: <FiSearch /> },
    { name: "notifications", icon: <FiBell /> },
    { name: "messages", icon: <FiMail /> },
    { name: "bookmarks", icon: <FiBookmark /> },
    { name: "lists", icon: <FiList /> },
    { name: "more", icon: <FiMoreHorizontal /> }
  ];

  if (!currentUser) {
    links.push({ name: "login",icon: <FiLogIn /> });
    links.push({ name: "register", icon: <FiUserPlus />});
  } else {
    links.push({ name: "profile", icon: <FiUser /> });
  }

  return (
    <div className="list-group">
      {links.map(({ name, icon }) => 
        <Link to={`/${name}`} className={`list-group-item text-capitalize ${active === name ? "active" : ""}`}>
          {icon} {name}
        </Link>
      )}
    </div>
  );
};

export default NavigationSidebar;
