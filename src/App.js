import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import About from "./views/About/About";
import Splash from "./views/Splash/Splash";
import FAQ from "./views/FAQ/FAQ";
import Contact from "./views/Contact/Contact";
import Logout from "./views/Logout/Logout";
import NewVanForm from "./components/NewVanForm/newVanForm";
import MyVan from "./views/myVan/myVan";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {}
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
      user: user
    });
  };

  handleLogout = () => {
    console.log("I have been clicked!!");
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
          <Switch>
            {authenticated && <PrivateRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={Home}
            />}
            {<PrivateRoute
            exact path="/newvan"
            user={this.state.user}
            authenticated={authenticated}
            component={NewVanForm}
            />}
            {<PrivateRoute
            exact path="/myvan"
            user={this.state.user}
            authenticated={authenticated}
            component={MyVan}
            />}
            {<PrivateRoute
              exact
              path="/logout"
              user={this.state.user}
              authenticated={authenticated}
              accessToken={localStorage.getItem("accessToken")}
              handleLogout={this.handleLogout}
              component={Logout}
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
