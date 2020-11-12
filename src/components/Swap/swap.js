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
    vandetails({id:this.props.van})
      .then((response) => {
        this.setState({
          make: response.Van.make,
          model: response.Van.model,
          year: response.Van.year,
          location: response.Van.location,
          ownername:response.Owner.fullname
        })
      })
      .catch((err) => console.log(err));
  };

  render() {
      const {make, model, year, location, ownername, accepted} = this.state;
      const {startdate, enddate} = this.props;
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
              <p>Status: {accepted && this.state.accepted}</p>
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swap;
