import React from "react";
import { Route, Link} from 'react-router-dom';
import './NavBarBlank1.css';
import './NavBarBlank2.css';
import './NavBarBlank3.css';

const NavBarBlank = () => {
  return (
    <div>
    <Route>
        <nav className="nav-bar-blank">
        <Link to={"/"} style={{'textDecoration':'none', 'color':'white'}}><img className="campervanlogo" src='/VanSwapLogo.svg' alt="Van Swap Logo"/></Link>
        </nav>
    </Route>
    </div>
  );
};

export default NavBarBlank;