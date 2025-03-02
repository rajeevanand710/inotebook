import React, {useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = (props) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    props.showAlert("Logged Out!", "warning")
    localStorage.removeItem('authToken')
    navigate("/login")
  }

  let location = useLocation();
  useEffect(()=>{
  },[location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('authToken')?<form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form>: <button className="btn btn-primary" onClick={handleLogout}> Logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
