import React from "react";
import { Route, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { vandetails } from "../../services/vanService";
import ImageSlider from "../../components/ImageSlider/imageSlider";
import "./vanDetails.css";

class VanDetails extends React.Component {
  state = {
    make: "",
    model: "",
    year: "",
    location: "",
    about: "",
    images: [],
    fullname: "",
    details: "",
    ownerId: "",
    image: "",
    id: localStorage.getItem("van-id")
  };

  componentDidMount = () => {
    const id = localStorage.getItem("van_id");
    console.log("id from local storage=", id);
    vandetails(id)
      .then((response) => {
        console.log("Response from vandetails service is:", response.Van);
        this.setState({
          make: response.Van.make,
          model: response.Van.model,
          year: response.Van.year,
          location: response.Van.location,
          about: response.Van.about,
          images: [...response.Van.images],
          fullname: response.Owner.fullname,
          details: response.Owner.about,
          ownerId: response.Owner._id,
          image: response.Owner.image,
        });
      })
      .catch((err) => console.log(err));
  };

  onClickHandler = () => {
    console.log(
      "owner details",
      this.state.details,
      "vanowner:",
      this.state.ownerId,
      "van:",
      this.state.id
    );
    localStorage.setItem("vanowner", this.state.ownerId);
    localStorage.setItem("van_id", this.state.id);
  };

  render() {
    return (
      <div>
        <NavBar
          button1="My Profile"
          link1="/"
          button2="Search Vans"
          link2="/allvans"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        <Route>
          <div className="titlecontainer">
            <h1>Van Details</h1>
            <Link
              to={`/swaprequest/${this.state.id}`}
              style={{ textDecoration: "none", color: "white" }}
              onClick={this.onClickHandler}
            >
              <button className="editbutton" type="submit">
                Make A Swap Request
              </button>
            </Link>
          </div>
          <div className="textbox">
            <p>Make: {this.state.make}</p>
            <p>Model: {this.state.model}</p>
            <p>Year: {this.state.year}</p>
            <p>Location: {this.state.location}</p>
            <p>Details: {this.state.about}</p>
            <ImageSlider images={this.state.images} />
            <p>Owner: {this.state.fullname}</p>
            <p>About the owner: {this.state.details}</p>
            <img src={this.state.image} alt="" />
            <Link
              to={"/allvans"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button type="submit">Back</button>
            </Link>
          </div>
        </Route>
        <Footer></Footer>
      </div>
    );
  }
}

export default VanDetails;
