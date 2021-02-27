import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="Navbar__links">
          <a href="#" className="Navbar__link">
            Login
          </a>
          <a href="#" className="Navbar__link">
            Register
          </a>
          <a href="#" className="Navbar__link">
            Logout
          </a>
        </div>
      </nav>
    );
  }
}
