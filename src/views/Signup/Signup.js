import React from "react";
import { signup } from "../../services/userService";
import NavBarBlank from '../../components/NavBarBlank/NavBarBlank';
import Footer from '../../components/Footer/Footer';
import './Signup.css';
import { uploadImage, addMultipleImages } from "../../services/userService";

class Signup extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    fullname: "",
    email: "",
    password: "",
    dateofbirth:"",
    location: "",
    about:"",
    image:"",
    images:[],
    errorMessage: ""
  };
};
  
  addImage = ({image}) => {
    this.setState({image})
  };

  addImages = ({images}) => {
    this.setState({images})
  };

  handleImageUpload = (event) => {
    uploadImage(event.target.files[0])
    .then((res) => this.addImage(res))
    .catch(console.error)
  };

  handleMultipleImages = (event) => {
  addMultipleImages(event.target.files)
  .then((res) => this.addImages(res))
  .catch(console.error)
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
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      dateofbirth: this.state.dateofbirth,
      location: this.state.location,
      about: this.state.about,
      image: this.state.image,
      images: this.state.images
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            console.log("new user details", response.user),
            this.props.authenticate(response.user),
            this.props.history.push("/newvan"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { fullname, email, password, dateofbirth, location, image, images, about, errorMessage } = this.state;
    return (
      <div>
      <NavBarBlank></NavBarBlank>
      <div className="titlecontainer">
          <h1>Your Profile</h1>
        </div>
      <div className="signup">
        {errorMessage !== "" && errorMessage}
        <form className="signupform" onSubmit={this.handleSubmit}>
          <label className="signuplabel">Full Name </label>
          <input className="signupinput"
            name="fullname"
            value={fullname}
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
          <label className="signuplabel">Date of Birth </label>
          <input className="signupinput"
            name="dateofbirth"
            value={dateofbirth}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label className="signuplabel">Location </label>
          <input className="signupinput"
            name="location"
            value={location}
            onChange={this.handleChange}
            required={true}
            type="text"
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
          <label className="signuplabel">Images </label>
            <input className="signupinput"
            name="image"
            type="file"
            value={image}
            onChange={this.handleImageUpload}
            />
            <input className="signupinput"
            name="images"
            type="file"
            value={images}
            multiple onChange={this.handleMultipleImages}
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
