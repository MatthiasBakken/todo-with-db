import React from 'react'
import { Link } from 'react-router-dom';

import './Menu.css';


const Menu = () => {

  return (
    <div className="menu-container">
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
      <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
        <div className="spinner diagonal part-1"></div>
        <div className="spinner horizontal"></div>
        <div className="spinner diagonal part-2"></div>
      </label>
      <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
          <li className="menu-title">MY TODO LIST <span>Menu Options</span></li>
          <Link to="/">
            <li className="menu-home">MY TODO LIST</li>
          </Link>
          <Link to="/create-todo">
            <li className="menu-create">CREATE NEW TODO</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Menu;