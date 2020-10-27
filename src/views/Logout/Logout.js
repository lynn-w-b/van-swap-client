import React from "react";
import { logout } from "../../services/userService";
import Footer from '../../components/Footer/Footer';
import './Logout.css';

class Logout extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };
  handleLogout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    login({
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            this.props.authenticate(response.user),
            this.props.history.push("/"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div>
      <div className="login">
        {errorMessage !== "" && errorMessage}
        <form className="loginform" onSubmit={this.handleSubmit}>
          <label className="loginlabel">Email </label>
          <input className="logininput"
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label className="loginlabel">Password </label>
          <input className="logininput"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <button className="loginbutton" type="submit"> Login </button>
        </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Login;
