import React from "react";
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './About1.css';
import './About2.css';
import './About3.css';


const About = () => {
  return (
    <div>
      <NavBar button1="FAQ" link1="/faq" button2="Contact" link2="/contact" button3="Back" link3="/"></NavBar>
        <div className="titlecontainer">
          <h1>About</h1>
        </div>
        <div className="textbox">
            <p>This is where the information about the app will go...</p>
        </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
