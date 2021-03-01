import React from "react";
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './Contact1.css';
import './Contact2.css';
import './Contact3.css';

const Contact = () => {
  return (
    <div>
      <NavBar button1="About" link1="/about" button2="FAQ" link2="/faq" button3="Back" link3="/"></NavBar>
        <div className="titlecontainer">
          <h1>Contact Us</h1>
        </div>
        <div className="textbox">
            <p>This is where the user will be able to send a message to the app developer</p>
            <button className="sendbutton">Send</button>
        </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;