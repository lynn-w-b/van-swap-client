import React from "react";
import { Route, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { getswapdetails, editswap } from "../../services/vanService";
import ImageSlider from "../../components/ImageSlider/imageSlider";
import "./swapDetails.css";

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
    vanowner:"",
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
          vanowner: response.Vanowner._id,
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
      this.setState({ 
        decision: "Accepted", 
      });
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
    let button;
      if(this.state.decision === "Pending Approval" || !this.state.decision) {
        button = <button className="pendingbutton">Pending Approval</button>
    } else if(this.state.decision === "Accepted"){
        button = <button className="acceptbutton">Accepted</button>
    } else if(this.state.decision === "Declined"){
        button = <button className="declinebutton">Declined</button>
    } else {
      button = <button className="pendingbutton">Pending Approval</button>
    };
    return (
      <div className="swapdetails">
        <NavBar
          button1="My Profile"
          link1="/"
          button2="Search Vans"
          link2="/allvans"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        {/* <div className="titlecontainer">
          <h1>Swap Request Details</h1>
        </div> */}
        <div className="titlecontainer">
          <h1>Swap Requested By...</h1>
        </div>
        <div className="textbox">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Details</h3>
            </div>
            <div className="panel-body">
              <div className="first-panel">
                <div>
                  <p>{this.state.swaprequesterfullname}</p>
                  <p>
                    <span className="email">
                      {this.state.swaprequesteremail}
                    </span>
                  </p>
                  <p>{this.state.swaprequesterdateofbirth}</p>
                  <p>{this.state.swaprequesterlocation}</p>
                </div>
                <div>
                  <div>
                    <p className="handwriting">Swap requester</p>
                  </div>
                  <div>
                    <img
                      className="arrow"
                      src="/hand-drawn-arrow-1-300x276.png"
                      alt=""
                    />
                    <img
                      className="photo"
                      src={this.state.swaprequesterimage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">About</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.swaprequesterdetails}</p>
            </div>
          </div>
        </div>
        <div className="titlecontainer">
          <h1>Swap Details...</h1>
        </div>
        <div className="textbox">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Dates</h3>
            </div>
            <div className="panel-body">
              <p>
                <span>From</span> {this.state.startdate} <span>to</span>{" "}
                {this.state.enddate}
              </p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">
                Additional information about this request
              </h3>
            </div>
            <div className="panel-body">
              <p>{this.state.additionalInfo}</p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Status</h3>
            </div>
            <div className="panel-body">
              <p>{button}</p>
            </div>
          </div>
        </div>
        <div className="titlecontainer">
          <h1>Van proposed for swap...</h1>
        </div>
        <div className="textbox">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Images</h3>
            </div>
            <div className="panel-body">
              <div className="imagesliderbox">
                <ImageSlider images={this.state.vantoswapimages}></ImageSlider>
              </div>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Van details</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vantoswapmake}</p>
              <p>{this.state.vantoswapmodel}</p>
              <p>{this.state.vantoswapyear}</p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Location</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vantoswaplocation}</p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">About this van...</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vantoswapabout}</p>
            </div>
          </div>
        </div>
        <div className="titlecontainer">
          <h1>Van requested owned by...</h1>
        </div>
        <div className="textbox">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Details</h3>
            </div>
            <div className="panel-body">
              <div className="first-panel">
                <div>
                  <p>{this.state.vanownerfullname}</p>
                  <p>
                    <span className="email">{this.state.vanowneremail}</span>
                  </p>
                  <p>{this.state.vanownerdateofbirth}</p>
                  <p>{this.state.vanownerlocation}</p>
                </div>
                <div>
                  <div>
                    <p className="handwriting">The owner of this van</p>
                  </div>
                  <div>
                    <img
                      className="arrow"
                      src="/hand-drawn-arrow-1-300x276.png"
                      alt=""
                    />
                    <img
                      className="photo"
                      src={this.state.vanownerimage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">About</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vanownerdetails}</p>
            </div>
          </div>
        </div>
        <div className="titlecontainer">
          <h1>Van requested...</h1>
        </div>
        <div className="textbox">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Images</h3>
            </div>
            <div className="panel-body">
              <div className="imagesliderbox">
                <ImageSlider images={this.state.vanimages}></ImageSlider>
              </div>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Van details</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vanmake}</p>
              <p>{this.state.vanmodel}</p>
              <p>{this.state.vanyear}</p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Location</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vanlocation}</p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">About this van...</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.vanabout}</p>
            </div>
          </div>
        </div>
        <div className="textbox">
          <div className="centred">
            <button className="acceptbutton big" onClick={this.onClickHandler}>
              <span>Accept Swap</span>
            </button>
            <button
              className="declinebutton big"
              onClick={this.onClickHandler2}
            >
              <span>Decline Swap</span>
            </button>
          </div>
          {this.state.alert && (
            <div className="teal handwriting big centred">{this.state.alert}</div>
          )}
        </div>
        <div>
        <Route>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <button className="backyougobutton" type="submit">Back</button>
          </Link>
        </Route>
        <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default SwapDetails;
