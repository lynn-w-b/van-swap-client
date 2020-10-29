import React from "react";
import {Route, Link} from "react-router-dom";
import { logout } from "../../services/userService";
import Footer from '../../components/Footer/Footer';
import './Logout.css';

class Logout extends React.Component {
  state = {
    accessToken: this.props.accessToken,
    errorMessage: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    logout({
      accessToken: this.state.accessToken
    })
      .then((response) =>
        this.props.handleLogout()
      )
      .catch((err) => {
        console.log(err);
      });
  };
  render () {
    console.log(this.props);
    const {errorMessage} = this.state;
    return (
      <div>
      <div className="login">
        {errorMessage !== "" && errorMessage}
        <form className="loginform" onSubmit={this.handleSubmit}>
          <p className="exittext">Are you sure you would like to log-out?</p>
          <button className="loginbutton" type="submit"> Log-out </button>
          <Route>
          <Link to={"/"} style={{'textDecoration':'none', 'color':'white', 'textAlign':'center'}}>Back</Link>
          </Route>
        </form>
        </div>
        <Footer></Footer>
      </div>
    );
}}

export default Logout;
