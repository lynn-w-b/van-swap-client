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
    id: localStorage.getItem("van_id"),
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
      <div className="vandetails">
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
            <img
              className="book"
              src="/abc-educational-book-hand-drawn-toy.svg"
              alt=""
            />
            <p>Everything you always wanted to know....</p>
            <Link
              to={`/swaprequest/${this.state.id}`}
              style={{ textDecoration: "none", color: "white" }}
              onClick={this.onClickHandler}
            >
              <button className="swapbutton" type="submit">
                Make A Swap Request
              </button>
            </Link>
          </div>
          <div className="textbox">
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Images</h3>
              </div>
              <div className="panel-body">
                <div className="imagesliderbox">
                  <ImageSlider images={this.state.images} />
                </div>
              </div>
            </div>
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Van Details</h3>
              </div>
              <div className="panel-body">
                <p>{this.state.make}</p>
                <p>{this.state.model}</p>
                <p>{this.state.year}</p>
              </div>
            </div>
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Location</h3>
              </div>
              <div className="panel-body">
                <p>{this.state.location}</p>
              </div>
            </div>
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">About This Van...</h3>
              </div>
              <div className="panel-body">
                <p>{this.state.about}</p>
              </div>
            </div>
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Van Owner</h3>
              </div>
              <div className="panel-body">
                <p>{this.state.fullname}</p>
              </div>
            </div>
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">About the owner...</h3>
              </div>
              <div className="panel-body">
                <div className="first-panel">
                  <div>
                    <p className="limited">{this.state.details}</p>
                  </div>
                  <div>
                    <div>
                      <p className="handwriting">This is the proud owner!</p>
                    </div>
                    <div>
                      <img
                        className="arrow"
                        src="/hand-drawn-arrow-1-300x276.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <img className="photo" src={this.state.image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={"/allvans"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="backbutton" type="submit">
                Back
              </button>
            </Link>
          </div>
        </Route>
        <Footer></Footer>
      </div>
    );
  }
}

export default VanDetails;
