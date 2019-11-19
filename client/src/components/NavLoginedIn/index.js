import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class NavLoginedIn extends Component {
   logOutFun =()=>{
    toast.info("you are successfully logged out... !");
    window.location.reload();
    API.logOut()
    .then((res)=>{
     console.log(res)
    }).catch(err=>console.log(err))
   }
  render() {
 
  return (
    <div className="container-fluid tobarCustomPadding">
       <div className="row bg-dark topbar">
          <div className="col-md-6">
          <a className="navbar-brand" href="/"> <i className="fas fa-poo-storm" aria-hidden="true"></i>  Project 3</a>
          </div>
          <div className="col-md-6 topBarIcons">
            <span><a href="#"><i className="fas fa-search" aria-hidden="true">  </i></a></span>
            <span><a href="#"><i className="far fa-bookmark" aria-hidden="true">  </i></a></span>
            <span><a href="/login"><i className="fas fa-user-circle" aria-hidden="true"></i></a></span>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light bg-navBar">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav" id="category-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blogs">Blogs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news">News</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="/new-post">Share a Post</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
              </li>

              <li className="nav-item">
                  <a href="#" className="nav-link" onClick={() => this.logOutFun()}>Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
    </div>
  );
}
}
export default NavLoginedIn;
