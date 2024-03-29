import React from "react";
import { Route, Link} from 'react-router-dom';
import './NavBar1.css';
import './NavBar2.css';
import './NavBar3.css';


const NavBar = (props) => {
  const { button1, link1, button2, link2, button3, link3 } = props;
  return (
    <div>
    <Route>
    <nav className="mainnav">
        <div>
        <Link to={"/"} style={{'textDecoration':'none', 'color':'white'}}><img className="mainnavimage" src='/SVG/SVG/Asset 3.svg' alt="Van Swap Logo"/></Link>
        </div>
        <div className="buttons buttonplace">
        <button className="mainnavbutton"><Link to={link1} style={{'textDecoration':'none', 'color':'white'}}>{button1}</Link></button>
        <button className="mainnavbutton"><Link to={link2} style={{'textDecoration':'none', 'color':'white'}}>{button2}</Link></button>
        <button className="endnavbutton"><Link to={link3} style={{'textDecoration':'none', 'color':'white'}}>{button3}</Link></button>
        </div>
      </nav>
    </Route>
    </div>
  );
};

export default NavBar;

        