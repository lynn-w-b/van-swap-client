import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import About from "./views/About";
import Splash from "./components/Splash";
import FAQ from "./views/FAQ";
import Contact from "./views/Contact";

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
        {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Log-out
              </Link>
            )}
          <Switch>
            {authenticated && <PrivateRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={Home}
            />}
            {!authenticated && <AnonRoute
              exact path="/"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Splash}
              />}
            {!authenticated && <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />}
            {!authenticated && <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />}
            {!authenticated && <AnonRoute
              exact
              path="/about"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={About}
            />}
            {!authenticated && <AnonRoute
              exact
              path="/faq"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={FAQ}
            />}
            {!authenticated && <AnonRoute
              exact
              path="/contact"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Contact}
            />}
          </Switch>
        </BrowserRouter> 
      </div>
    );
  }
}

export default App;
