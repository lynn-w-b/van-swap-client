import React from "react";
import { Route, Link} from 'react-router-dom';
import './Splash.css';
import Footer from "../../components/Footer/Footer";

const Splash = () => {
  return (
    <div>
    <Route>
    <nav className="splash-nav">
        <div className="splash-buttons">
        <button><Link to ='/login' style={{'textDecoration':'none', 'color':'white'}}>Log-in</Link></button>
        <button><Link to ='/signup' style={{'textDecoration':'none', 'color':'white'}}>Sign-up</Link></button>
        <button><Link to ='/about' style={{'textDecoration':'none', 'color':'white'}}>About</Link></button>
        </div>
      </nav>
    </Route>
    <div>
        <img className="splash-image" src='/VanSwapLogo.svg' alt="Van Swap Logo"/>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Splash;



