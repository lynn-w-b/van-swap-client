import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './Home.css';

const Home = (props) => {
  console.log(props);
  const { fullname, dateofbirth, location, about } = props.user;
  return (
    <div>
    <NavBar button1="My Van" link1="/myvan" button2="Search Vans" link2="/allvans" button3="Log-out" link3="/logout"></NavBar>
    <div className="titlecontainer">
      <h1>My Profile</h1>
      <Route>
      <Link to={"/editprofile"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton"><img src="/2_-_1_-_Pencil.jpg" alt="Edit profile"/></button></Link>
      </Route>
    </div>
    <div className="textbox">
      <p>Name: {fullname && props.user.fullname}</p>
      <p>DOB: {dateofbirth && props.user.dateofbirth}</p>
      <p>Location: {location && props.user.location}</p>
      <p>Details: {about && props.user.about}</p>
    </div>
    <div className="titlecontainer">
      <h1>Swap Requests Received</h1>
    </div>
    <div className="textbox">
      <p>This is where the swap requests will go linked to the swap request form</p>
    </div>
    <div className="titlecontainer">
      <h1>Swap Requests Sent</h1>
    </div>
    <div className="textbox">
      <p>This is where the swap requests will go linked to the swap request form</p>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Home;
