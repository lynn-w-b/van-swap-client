import React from "react";
import { Route, Link } from "react-router-dom";
import { userdetails } from "../../services/userService";

class Swapgot extends React.Component {
  state = {
    requestername: "",
    requesterlocation: "",
    accepted: this.props.accepted,
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
    if(this.state.accepted) {
        button = <button>Request Accepted</button>
    } else {
        button = <button>Request Pending Approval</button>
    }
    return (
      <div>
        <Route>
          <Link
            to={`/swapdetails/${this.props.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="vanviewbox">
              <p>
                Your van has been requested from:{" "}
                {startdate && this.props.startdate} until:{" "}
                {enddate && this.props.enddate}
              </p>
              <p>
                By: {requestername && this.state.requestername} From:{" "}
                {requesterlocation && this.state.requesterlocation}
              </p>
              <p>Status: {button}</p>
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swapgot;
