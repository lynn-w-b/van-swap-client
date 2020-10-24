import React from "react";
import { signup } from "../services/userService";
import NavBarBlank from '../components/NavBarBlank';
import Footer from '../components/Footer';
import './Signup.css';

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    about:"",
    image:"",
    errorMessage: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      about: this.state.about,
      image: this.state.image
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
      .catch((err) => console.log(err));
  };

  render() {
    const { username, email, password, about, image, errorMessage } = this.state;
    return (
      <div>
      <NavBarBlank></NavBarBlank>
      <div className="titlecontainer">
          <h1>Your Profile</h1>
        </div>
      <div className="signup">
        {errorMessage !== "" && errorMessage}
        <form className="signupform" onSubmit={this.handleSubmit}>
          <label className="signuplabel">Username </label>
          <input className="signupinput"
            name="username"
            value={username}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label className="signuplabel">Email </label>
          <input className="signupinput"
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label className="signuplabel">Password </label>
          <input className="signupinput"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <label className="signuplabel">About Me </label>
          <textarea className="signuptextarea"
          rows="15"
          cols="25"
          name="about"
          value={about}
          onChange={this.handleChange}
          required={true}
          />
          <label className="signuplabel">Image </label>
          <input className="signupinput"
          name="image"
          type="file"
          value={image}
          onChange={this.handleChange}
          required={true}
          />
          <button className="signupbutton" type="submit"> Sign up </button>
        </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Signup;
