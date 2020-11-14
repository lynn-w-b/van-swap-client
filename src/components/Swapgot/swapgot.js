import React from "react";
import { Route, Link } from "react-router-dom";
import { userdetails } from "../../services/userService";

class Swapgot extends React.Component {
  state = {
    requestername: "",
    requesterlocation: "",
    decision: this.props.decision,
  };

  componentDidMount = () => {
    console.log("Swapgot componeent props=", this.props);
    userdetails({ id: this.props.swaprequester })
      .then((response) => {
          console.log("swapgot user details response=", response);
        this.setState({
          requestername: response.User.fullname,
          requesterlocation: response.User.location,
        });
        localStorage.setItem("swap_id", this.props.id);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      requesterlocation,
      requestername,
    } = this.state;
    const { startdate, enddate } = this.props;
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
              <p className="swaptext">
                Your van has been requested <span>from</span>{" "}
                {startdate && this.props.startdate} <span>until</span>{" "}
                {enddate && this.props.enddate}
              </p>
              <p className="swaptext">
                <span>By</span> {requestername && this.state.requestername} <span>from</span>{" "}
                {requesterlocation && this.state.requesterlocation}
              </p>
              <p className="swaptext"><span>Status</span> {button}</p>
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swapgot;
