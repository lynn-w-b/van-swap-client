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
import EditProfile from "./components/EditProfile/editProfile";
import EditVan from "./components/EditVan/editVan";
import DeleteVan from "./components/DeleteVan/deleteVan";
import DeleteProfile from "./components/DeleteProfile/deleteProfile";
import AllVans from "./views/AllVans/allVans";
import VanDetails from "./views/VanDetails/vanDetails";
import SwapRequest from "./views/SwapRequest/swapRequest";
import SwapDetails from "./views/SwapDetails/swapDetails";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    image: "",
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
    } else {
      this.setState({
        authenticated: false,
        user: {},
      });
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user: user,
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
            {authenticated && (
              <PrivateRoute
                exact
                path="/"
                user={this.state.user}
                authenticated={authenticated}
                component={Home}
              />
            )}
            {
              <PrivateRoute
                exact
                path="/newvan"
                authenticate={this.authenticate}
                user={this.state.user}
                authenticated={authenticated}
                component={NewVanForm}
              />
            }
            {
              <PrivateRoute
                exact
                path="/myvan"
                user={this.state.user}
                authenticated={authenticated}
                component={MyVan}
              />
            }
            {
              <PrivateRoute
                exact
                path="/logout"
                user={this.state.user}
                authenticated={authenticated}
                accessToken={localStorage.getItem("accessToken")}
                handleLogout={this.handleLogout}
                component={Logout}
              />
            }
            {
              <PrivateRoute
                exact
                path="/editprofile"
                user={this.state.user}
                authenticate={this.authenticate}
                authenticated={authenticated}
                component={EditProfile}
              />
            }
            {
              <PrivateRoute
                exact
                path="/deleteprofile"
                user={this.state.user}
                authenticate={this.authenticate}
                authenticated={authenticated}
                component={DeleteProfile}
              />
            }
            {
              <PrivateRoute
                exact
                path="/editvan"
                user={this.state.user}
                authenticated={authenticated}
                component={EditVan}
              />
            }
            {
              <PrivateRoute
                exact
                path="/deletevan"
                user={this.state.user}
                authenticated={authenticated}
                component={DeleteVan}
              />
            }
            {
              <PrivateRoute
                exact
                path="/allvans"
                user={this.state.user}
                authenticated={authenticated}
                component={AllVans}
              />
            }
            {
              <PrivateRoute
                exact
                path="/vandetails/:id"
                user={this.state.user}
                authenticated={authenticated}
                component={VanDetails}
              />
            }
            {
              <PrivateRoute
                exact
                path="/swaprequest/:id"
                user={this.state.user}
                authenticated={authenticated}
                component={SwapRequest}
              />
            }
            {
              <PrivateRoute
                exact
                path="/swapdetails/:id"
                user={this.state.user}
                authenticated={authenticated}
                component={SwapDetails}
              />
            }
            {!authenticated && (
              <AnonRoute
                exact
                path="/"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Splash}
              />
            )}
            {!authenticated && (
              <AnonRoute
                exact
                path="/login"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Login}
              />
            )}
            {!authenticated && (
              <AnonRoute
                exact
                path="/signup"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Signup}
              />
            )}
            {!authenticated && (
              <AnonRoute
                exact
                path="/about"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={About}
              />
            )}
            {!authenticated && (
              <AnonRoute
                exact
                path="/faq"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={FAQ}
              />
            )}
            {!authenticated && (
              <AnonRoute
                exact
                path="/contact"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Contact}
              />
            )}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
