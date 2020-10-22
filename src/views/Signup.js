import React from "react";
import { signup } from "../services/userService";

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
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <label>username: </label>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <label>About Me: </label>
          <textarea
          rows="5"
          cols="25"
          name="about"
          value={about}
          onChange={this.handleChange}
          required={true}
          />
          <label>Image: </label>
          <input
          name="image"
          type="file"
          value={image}
          onChange={this.handleChange}
          required={true}
          />
          <button type="submit"> Sign up </button>
        </form>
      </div>
    );
  }
}

export default Signup;
