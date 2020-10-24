import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './Home.css';

const Home = (props) => {
  const { fullname, dateofbirth, location, about:details } = props.user;
  return (
    <div>
    <NavBar button1="My Van" link1="/myvan" button2="Search Vans" link2="/allvans" button3="Log-out" Link3="/log-out"></NavBar>
    <div className="titlecontainer">
      <h1>My Profile {fullname && props.user.username}</h1>
      <button className="editbutton"><img src="/2_-_1_-_Pencil.jpg" alt="Edit profile"/></button>
    </div>
    <div className="textbox">
      <p>Name: {fullname}</p>
      <p>DOB: {dateofbirth}</p>
      <p>Location: {location}</p>
      <p>Details: {details}</p>
    </div>
    <div className="titlecontainer">
      <h1>Swap Requests</h1>
    </div>
    <div className="textbox">
      <p>This is where the swap requests will go linked to the swap request form</p>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Home;
