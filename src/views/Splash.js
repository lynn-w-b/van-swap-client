import React from "react";
import './Splash.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar} from 'react-bulma-components/dist';

const Splash = () => {
    return (
      <div>
      <Navbar
        color='warning'
      >
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <img src="../../public/Van Swap Logo.svg" alt="Van Swap Logo" width="112" height="28" />
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container>
            <Navbar.Item dropdown hoverable href="#">
              <Navbar.Link>
                About
              </Navbar.Link>
              <Navbar.Dropdown>
                <Navbar.Item href="#">
                  About
                </Navbar.Item>
                <Navbar.Item href="#">
                  FAQ
                </Navbar.Item>
                <Navbar.Item href="#">
                    Contact
                </Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="#">
                  Signup
            </Navbar.Item>
            <Navbar.Item href="#">
                  Login
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
      </div>
    );
  };
  
  export default Splash;