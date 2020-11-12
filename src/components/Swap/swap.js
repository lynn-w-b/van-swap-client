import React from "react";
import { Route, Link } from "react-router-dom";
import { vandetails } from "../../services/vanService";

class Swap extends React.Component {
  state = {
    make: "",
    model: "",
    year: "",
    location: "",
    ownername: "",
    accepted: this.props.accepted,
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
                Van requested: {make && this.state.make} {model && this.state.model}{" "}
                {year && this.state.year} located in: {location && this.state.location}
              </p>
              <p>
                Requested from: {startdate && this.props.startdate} until:{" "}
                {enddate && this.props.enddate}
              </p>
              <p>Van owner: {ownername && this.state.ownername}</p>
              <p>Status: {button}</p>
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swap;
