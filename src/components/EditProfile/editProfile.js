import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./editProfile.css";
import { editprofile } from "../../services/userService";
import { uploadImage } from "../../services/userService";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user._id,
      fullname: this.props.user.fullname,
      email: this.props.user.email,
      password: this.props.user.password,
      dateofbirth: this.props.user.dateofbirth,
      location: this.props.user.location,
      about: this.props.user.about,
      image: this.props.user.image,
      errorMessage: "",
      datareceived: false,
      isLoading: false,
    };
  }

  addImage = (image) => {
    this.setState({ image: image });
    this.setState({ datareceived: true });
    this.setState({ isLoading: false });
  };

  handleImageUpload = (event) => {
    this.setState({ datareceived: false });
    this.setState({ isLoading: true });
    uploadImage(event.target.files[0])
      .then((res) => {
        console.log("IMAGE BACK", res);
        this.addImage(res);
      })
      .catch(console.error);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    editprofile({
      id: this.state.id,
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      dateofbirth: this.state.dateofbirth,
      location: this.state.location,
      about: this.state.about,
      image: this.state.image,
    })
      .then((response) =>
        response.User
          ? (this.props.authenticate(response.User),
            this.props.history.push("/"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const {
      fullname,
      email,
      dateofbirth,
      location,
      about,
      errorMessage,
    } = this.state;
    return (
      <div className="editprofile">
        <NavBar
          button1="Back"
          link1="/"
          button2="Delete Profile"
          link2="/deleteprofile"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        <div className="titlecontainer">
          <h1>Edit Profile</h1>
        </div>
        <div className="signup">
          {errorMessage !== "" && errorMessage}
          <form className="signupform" onSubmit={(e) => this.handleSubmit(e)}>
            <label className="signuplabel">Full Name </label>
            <input
              className="signupinput"
              name="fullname"
              value={fullname}
              onChange={(e) => this.handleChange(e)}
              type="text"
            />
            <label className="signuplabel">Email </label>
            <input
              className="signupinput"
              name="email"
              value={email}
              onChange={(e) => this.handleChange(e)}
              type="email"
            />
            {/* <label className="signuplabel">Password </label>
           <input className="signupinput"
             name="password"
             type="password"
             value={password}
             onChange={this.handleChange}
             required={true}
           /> */}
            <label className="signuplabel">Date of Birth </label>
            <input
              className="signupinput"
              name="dateofbirth"
              value={dateofbirth}
              onChange={(e) => this.handleChange(e)}
              type="text"
            />
            <label className="signuplabel">Location </label>
            <input
              className="signupinput"
              name="location"
              value={location}
              onChange={(e) => this.handleChange(e)}
              type="text"
            />
            <label className="signuplabel">About Me </label>
            <textarea
              className="signuptextarea"
              rows="15"
              cols="25"
              name="about"
              value={about}
              onChange={(e) => this.handleChange(e)}
            />
            <label className="signuplabel">Image </label>
            <input
              className="signupinput"
              name="image"
              type="file"
              //  value={image}
              onChange={this.handleImageUpload}
            />
            {this.state.isLoading && <div>Image loading....</div>}
            <button className="signupbutton" type="submit" disabled={!this.state.datareceived}>
              {" "}
              Save changes{" "}
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default EditProfile;
