import React from "react";
import { Route, Link } from "react-router-dom";
import { login } from "../../services/userService";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  // handleClick = (event) => {
  //   this.setState({
  //     email:""
  //   });
  // };

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
          ? (console.log("login response", response),
            localStorage.setItem("accessToken", response.accessToken),
            localStorage.setItem("currentuser", response.user._id),
            localStorage.setItem("currentusername", response.user.fullname),
            localStorage.setItem("yourvan", response.van._id),
            localStorage.setItem( "yourvanmake", response.van.make),
            localStorage.setItem ("yourvanmodel", response.van.model),
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
            <input
              className="logininput"
              name="email"
              value={email}
              onChange={this.handleChange}
              required={true}
              type="email"
            />
            <label className="loginlabel">Password </label>
            <input
              className="logininput"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              required={true}
            />
            <button className="loginbutton" type="submit">
              {" "}
              Login{" "}
            </button>
            <Route>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Back
              </Link>
            </Route>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Login;
