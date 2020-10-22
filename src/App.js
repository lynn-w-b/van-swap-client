import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Splash from './views/Splash';

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
  };
  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          console.log(response, "RESPONSE");
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };
  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            {!authenticated && <Link to="/"> Splash </Link>}
            {authenticated && <Link to="/"> Home </Link>}
            {!authenticated && <Link to="/login"> Login </Link>}
            {!authenticated && <Link to="/signup"> Signup </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav>
          <Switch>
            <AnonRoute
              exact path="/"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Splash}
              />
            <PrivateRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={Home}
            />
            <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />
            <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />
          </Switch>
        </BrowserRouter> 
      </div>
    );
  }
}

export default App;
