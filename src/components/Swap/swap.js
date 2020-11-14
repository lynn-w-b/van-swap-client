import React from "react";
import { Route, Link } from "react-router-dom";
import { vandetails } from "../../services/vanService";
import './swap.css';

class Swap extends React.Component {
  state = {
    make: "",
    model: "",
    year: "",
    location: "",
    ownername: "",
    decision: this.props.decision,
  };

  componentDidMount = () => {
    console.log("Swap componeent props=", this.props.van);
    vandetails(this.props.van)
      .then((response) => {
          console.log("swap vandetails response", response);
        this.setState({
          make: response.Van.make,
          model: response.Van.model,
          year: response.Van.year,
          location: response.Van.location,
          ownername:response.Owner.fullname
        });
        localStorage.setItem("swap_id", this.props.id);
      })
      .catch((err) => console.log(err));
  };

  render() {
      const {make, model, year, location, ownername} = this.state;
      const {startdate, enddate} = this.props;
      let button;
      if(this.state.decision === "Pending Approval" || !this.state.decision) {
        button = <button className="pendingbutton">Pending Approval</button>
    } else if(this.state.decision === "Accepted"){
        button = <button className="acceptbutton">Accepted</button>
    } else {
        button = <button classname="declinebutton">Declined</button>
    }
    return (
      <div>
        <Route>
          <Link
            to={`/swapdetails/${this.props.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="swapviewbox">
              <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Van details</h3>
            </div>
            <div className="panel-body">
            <p className="swaptext">{make && this.state.make} {model && this.state.model}{" "}
                {year && this.state.year}<span> located in</span> {location && this.state.location}
              </p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Dates</h3>
            </div>
            <div className="panel-body">
            <p className="swaptext">
                <span>Requested from</span> {startdate && this.props.startdate} <span>until</span>{" "}
                {enddate && this.props.enddate}
              </p>
            </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Van Owner</h3>
            </div>
            <div className="panel-body">
            <p className="swaptext">{ownername && this.state.ownername}</p>
            </div>
          </div> 
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Status</h3>
            </div>
            <div className="panel-body">
            <p className="swaptext"><span>Status</span> {button}</p>
            </div>
          </div> 
          </div> 
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swap;
