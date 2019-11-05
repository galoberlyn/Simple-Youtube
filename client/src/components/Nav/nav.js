import React from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";


// setup the nav links 

let Navigation = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Simple YT</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/upload">Upload</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;




// <nav className="navbar navbar-expand-lg navbar-light bg-light">

// <span className="navbar-brand mb-0 h1">Simple YT</span>

// <div className="collapse navbar-collapse" id="navbarSupportedContent">

//   <ul className="navbar-nav mr-auto">
//     <li className="nav-item active">
//       <Link className="nav-link" to="/">Home</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/upload">Upload</Link>
//     </li>
//   </ul>

// </div>
// </nav>