import React from "react";
import './newVanForm.css';
import { newvan } from "../../services/vanService";
import NavBarBlank from "../NavBarBlank/NavBarBlank";
import Footer from "../Footer/Footer";
import { uploadImage, addMultipleImages } from "../../services/vanService";


class NewVanForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.user,
      make: "",
      model: "",
      year: "",
      location: "",
      about:"",
      image:"",
      images:"",
      errorMessage: ""
    };
  };

    addImage = ({image}) => {
      this.setState({image})
    }
  
    addImage = ({images}) => {
      this.setState({images})
    }
  
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
      newvan({
        user: this.state.user,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        location: this.state.location,
        about: this.state.about,
        image: this.state.image,
        images: this.state.images
      })
        .then((response) =>
          response.van
            ? (localStorage.setItem("van", response.van),
            this.props.history.push("/myvan"))
            : this.setState({
                errorMessage: response.errorMessage,
              })
        )
        .catch((err) => console.log(err));
    };
  
    render() {
      const { make, model, year, location, about, image, images, errorMessage } = this.state;
      return (
        <div>
    <NavBarBlank></NavBarBlank>
    <div className="titlecontainer">
      <h1>New Van</h1>
    </div>
    <div className="signup">
    {errorMessage !== "" && errorMessage}
          <form className="signupform" onSubmit={this.handleSubmit}>
            <label className="signuplabel">Make </label>
            <input className="signupinput"
              name="make"
              value={make}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <label className="signuplabel">Model </label>
            <input className="signupinput"
              name="model"
              value={model}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <label className="signuplabel">Year </label>
            <input className="signupinput"
              name="year"
              type="text"
              value={year}
              onChange={this.handleChange}
              required={true}
            />
            <label className="signuplabel">Location </label>
            <input className="signupinput"
              name="location"
              value={location}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <label className="signuplabel">Details </label>
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
            required={true}
            />
            <input className="signupinput"
            name="images"
            type="file"
            value={images}
            multiple onChange={this.handleMultipleImages}
            required={true}
            />
            <button className="signupbutton" type="submit"> Add New Van </button>
          </form>
          </div>
          <Footer></Footer>
        </div>
      );
    }
  }

export default NewVanForm;