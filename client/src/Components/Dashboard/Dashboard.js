import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import './style.css';

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/adminlogin');
        }
      })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Beetech Solutions
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Users
                  </span>
                </Link>
              </li>
              <ul>
                <li><Link
                  to="/dashboard/bookingCheckList"
                  className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Booking CheckList</span>
                </Link></li>
                <li>Add users</li>
              </ul>
              <li className="w-100">
                <Link
                  to="/dashboard/tour"
                  className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Booking</span>
                </Link>
              </li>
              <ul>
                <li><Link
                  to="/dashboard/tour " style={{ textDecoration: "none" }}
                  className="text-white">Tour</Link></li>
                <li><Link
                  to="/dashboard/confirmation" style={{ textDecoration: "none" }}
                  className="text-white">Confirmation</Link></li>
                <li><Link
                  to="/dashboard/booking-checklist" style={{ textDecoration: "none" }}
                  className="text-white">Booking CheckList</Link></li>
                <li><Link
                  to="/dashboard/arrival-list" style={{ textDecoration: "none" }}
                  className="text-white">Arrival List</Link></li>
                <li><Link
                  to="/dashboard/flight" style={{ textDecoration: "none" }}
                  className="text-white">Flight</Link></li>
                <li><Link
                  to="/dashboard/hotel" style={{ textDecoration: "none" }}
                  className="text-white">Hotels</Link></li>
                <li><Link
                  to="/dashboard/hotel-rates" style={{ textDecoration: "none" }}
                  className="text-white">Hotel Rate</Link></li>
                <li><Link
                  to="/dashboard/restaurant" style={{ textDecoration: "none" }}
                  className="text-white">Restaurant</Link></li>
                <li><Link
                  to="/dashboard/restaurant-rate" style={{ textDecoration: "none" }}
                  className="text-white">Restaurant Rate</Link></li>
                <li><Link
                  to="/dashboard/guide" style={{ textDecoration: "none" }}
                  className="text-white">Guide</Link></li>
                <li><Link
                  to="/dashboard/vehicle" style={{ textDecoration: "none" }}
                  className="text-white">Vehicle</Link></li>

              </ul>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Reservation Management System</h4>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
