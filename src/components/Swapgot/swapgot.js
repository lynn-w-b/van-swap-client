import React from "react";
import { Route, Link } from "react-router-dom";
import { userdetails } from "../../services/userService";
import { vandetails } from "../../services/vanService";

class Swapgot extends React.Component {
  state = {
    vantoswapmake: "",
    vantoswapmodel: "",
    vantoswapyear: "",
    vantoswap:"",
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
          vantoswap: response.Van._id,
          vantoswapmake: response.Van.make,
          vantoswapmodel: response.Van.model,
          vantoswapyear: response.Van.year,
        });
      })
      .catch((err) => console.log(err));
      console.log("swapgot vantoswap=", this.state.vantoswap);
      vandetails({ id: this.state.vantoswap})
      .then((response) => {
          console.log("swapgot van details response=", response);
          this.setState({
            vantoswapmake: response.Van.make,
            vantoswapmodel: response.Van.model,
            vantoswapyear: response.Van.year,
          })
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      vantoswapmake,
      vantoswapmodel,
      vantoswapyear,
      requesterlocation,
      requestername,
      accepted,
    } = this.state;
    const { startdate, enddate } = this.props;
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
              <p>
                Van to swap: {vantoswapmake && this.state.vantoswapmake}{" "}
                {vantoswapmodel && this.state.vantoswapmodel}{" "}
                {vantoswapyear && this.state.vantoswapyear}
              </p>
              <p>Status: {accepted && this.state.accepted}</p>
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default Swapgot;
