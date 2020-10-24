import React from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const FAQ = () => {
  return (
    <div>
      <NavBar button1="About" link1="/about" button2="Contact" link2="/contact" button3="Back" link3="/"></NavBar>
        <div className="titlecontainer">
          <h1>Frequently Asked Questions</h1>
        </div>
        <div className="textbox">
            <p>This is where the FAQs about the app will go...</p>
        </div>
      <Footer></Footer>
    </div>
  );
};

export default FAQ;
