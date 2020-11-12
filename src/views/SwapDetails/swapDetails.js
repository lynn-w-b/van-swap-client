import React from "react";
import { Route, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { getswapdetails, editswap } from "../../services/vanService";
import ImageSlider from "../../components/ImageSlider/imageSlider";

class SwapDetails extends React.Component {
  state = {
    vantoswapmake: "",
    vantoswapmodel: "",
    vantoswapyear: "",
    vantoswaplocation: "",
    vantoswapabout: "",
    vantoswapimages: [],
    vanmake: "",
    vanmodel: "",
    vanyear: "",
    vanlocation: "",
    vanabout: "",
    vanimages: [],
    vanownerfullname: "",
    vanowneremail: "",
    vanownerdetails: "",
    vanownerdateofbirth: "",
    vanownerlocation: "",
    vanownerimage: "",
    swaprequesterfullname: "",
    swaprequesteremail: "",
    swaprequesterdetails: "",
    swaprequesterdateofbirth: "",
    swaprequesterlocation: "",
    swaprequesterimage: "",
    startdate: "",
    enddate: "",
    additionalInfo: "",
    decision: "",
    id: localStorage.getItem("swap_id"),
    alert: "",
  };

  componentDidMount = () => {
    const id = localStorage.getItem("swap_id");
    console.log("id from props on swapdetails=", id);
    getswapdetails(id)
      .then((response) => {
        console.log("Response from swapdetails service is:", response);
        this.setState({
          vantoswapmake: response.Vantoswap.make,
          vantoswapmodel: response.Vantoswap.model,
          vantoswapyear: response.Vantoswap.year,
          vantoswaplocation: response.Vantoswap.location,
          vantoswapabout: response.Vantoswap.about,
          vantoswapimages: [...response.Vantoswap.images],
          vanmake: response.Van.make,
          vanmodel: response.Van.model,
          vanyear: response.Van.year,
          vanlocation: response.Van.location,
          vanabout: response.Van.about,
          vanimages: [...response.Van.images],
          vanownerfullname: response.Vanowner.fullname,
          vanowneremail: response.Vanowner.email,
          vanownerdetails: response.Vanowner.about,
          vanownerdateofbirth: response.Vanowner.dateofbirth,
          vanownerlocation: response.Vanowner.location,
          vanownerimage: response.Vanowner.image,
          swaprequesterfullname: response.Swaprequester.fullname,
          swaprequesteremail: response.Swaprequester.email,
          swaprequesterdetails: response.Swaprequester.about,
          swaprequesterdateofbirth: response.Swaprequester.dateofbirth,
          swaprequesterlocation: response.Swaprequester.location,
          swaprequesterimage: response.Swaprequester.image,
          startdate: response.Swap.startdate,
          enddate: response.Swap.enddate,
          additionalInfo: response.Swap.additionalInfo,
          decision: response.Swap.decision,
        });
      })
      .catch((err) => console.log(err));
  };

  onClickHandler = (event) => {
    if (this.state.vanowner === localStorage.getItem("currentuser")) {
      this.setState({ decision: "Accepted" });
      console.log("id and decision=", this.state.id, this.state.decision);
      editswap(this.state.id, this.state.decision).then((response) => {
        this.setState({
          alert:
            "You have accepted this swap request, please contact the swaprequester by email to make further arrangements",
        });
      });
    } else {
      this.setState({
        alert:
          "You do not have the authority to accept this van request, please wait for the van owner's decision",
      });
    }
  };
  onClickHandler2 = (event) => {
    if (this.state.vanowner === localStorage.getItem("currentuser")) {
      this.setState({ decision: "Declined" });
      editswap(this.state.id, this.state.decision).then((response) => {
        this.setState({
          alert:
            "You have declined this swap request, you need take no further action",
        });
      });
    } else {
      this.setState({
        alert:
          "You do not have the authority to decline this van request, please wait for the van owner's decision",
      });
    }
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
        <div className="titlecontainer">
          <h1>Swap Request Details</h1>
          {this.state.alert && <div>{this.state.alert}</div>}
        </div>
        <div className="titlecontainer">
          <h1>Swap Requested By...</h1>
        </div>
        <div className="textbox">
          <img src={this.state.swaprequesterimage} alt="" />
          <p>Name: {this.state.swaprequesterfullname}</p>
          <p>Email: {this.state.swaprequesteremail}</p>
          <p>Date of birth: {this.state.swaprequesterdateofbirth}</p>
          <p>Location: {this.state.swaprequesterlocation}</p>
          <p>About: {this.state.swaprequesterdetails}</p>
        </div>
        <div className="titlecontainer">
          <h1>Swap Details...</h1>
        </div>
        <div className="textbox">
          <p>Startdate: {this.state.startdate}</p>
          <p>Enddate: {this.state.enddate}</p>
          <p>Additional Information: {this.state.additionalInfo}</p>
          <p>Status:{this.state.decision}</p>
        </div>
        <div className="titlecontainer">
          <h1>Van proposed for Swap...</h1>
        </div>
        <div className="textbox">
          <ImageSlider images={this.state.vantoswapimages}></ImageSlider>
          <p>Make: {this.state.vantoswapmake}</p>
          <p>Model: {this.state.vantoswapmodel}</p>
          <p>Year: {this.state.vantoswapyear}</p>
          <p>Location: {this.state.vantoswaplocation}</p>
          <p>About: {this.state.vantoswapabout}</p>
        </div>
        <div className="titlecontainer">
          <h1>Van requested owned by...</h1>
        </div>
        <div className="textbox">
          <img src={this.state.vanownerimage} alt="" />
          <p>Name: {this.state.vanownerfullname}</p>
          <p>Email: {this.state.vanowneremail}</p>
          <p>Date of birth: {this.state.vanownerdateofbirth}</p>
          <p>Location: {this.state.vanownerlocation}</p>
          <p>About: {this.state.vanownerdetails}</p>
        </div>
        <div className="titlecontainer">
          <h1>Van requested...</h1>
        </div>
        <div className="textbox">
          <ImageSlider images={this.state.vanimages}></ImageSlider>
          <p>Make: {this.state.vanmake}</p>
          <p>Model: {this.state.vanmodel}</p>
          <p>Year: {this.state.vanyear}</p>
          <p>Location: {this.state.vanlocation}</p>
          <p>About: {this.state.vanabout}</p>
        </div>
        <div className="textbox">
          <button onClick={this.onClickHandler}>Accept Swap</button>
          <button onClick={this.onClickHandler2}>Decline Swap</button>
        </div>
        <Route>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <button type="submit">Back</button>
          </Link>
        </Route>
        <Footer></Footer>
      </div>
    );
  }
}

export default SwapDetails;
