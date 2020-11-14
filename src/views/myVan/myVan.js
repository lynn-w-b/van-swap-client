import React from "react";
import { Route, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./myVan.css";
import { getvan } from "../../services/vanService";
import ImageSlider from "../../components/ImageSlider/imageSlider";

class MyVan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      make: "Please enter the make of your van",
      model: "Please enter the model of your van",
      year: "Please enter the year of your van",
      location: "Please enter the location of your van",
      about: "Please enter additional information about your van",
      images: [],
    };
  }

  componentDidMount = () => {
    console.log("User for my van is: ", this.state.user);
    getvan({ user: this.state.user })
      .then((response) => {
        console.log("Response from images service is:", response);
        this.setState({
          make: response.Van.make,
          model: response.Van.model,
          year: response.Van.year,
          location: response.Van.location,
          about: response.Van.about,
          images: response.Van.images,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="myvan">
        <NavBar
          button1="My Profile"
          link1="/"
          button2="Search Vans"
          link2="/allvans"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        <div className="titlecontainer">
          <h1>My Van</h1>
          <img className="campervan" src="/campervan.svg" alt=""/>
          <p>(your pride and joy!)</p>
          <Route>
            <Link
              to={"/editvan"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="editbutton">
                <img src="/2_-_1_-_Pencil.jpg" alt="Edit van details" />
              </button>
            </Link>
          </Route>
        </div>
        <div className="textbox">
        <div className="panel-body">
        <div className="panel panel-warning">
  <div className="panel-heading">
    <h3 className="panel-title">Images</h3>
  </div>
  <div className="imagesliderbox">
  <ImageSlider className="imageslidercomp" images={this.state.images} />
  </div>
  </div>
        <div className="panel panel-warning">
  <div className="panel-heading">
    <h3 className="panel-title">Van</h3>
  </div>
  <div className="panel-body">
  <p>{this.state.make}</p>
          <p>{this.state.model}</p>
          <p>{this.state.year}</p>
          <p>{this.state.location}</p>
  </div>
</div>
<div className="panel panel-warning">
  <div className="panel-heading">
    <h3 className="panel-title">Details</h3>
  </div>
  <div className="panel-body">
  <p>{this.state.about}</p>
  </div>
  </div>     
        </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default MyVan;
