import React from "react";
import { createswap } from "../../services/vanService";
import NavBarBlank from "../../components/NavBarBlank/NavBarBlank";
import Footer from "../../components/Footer/Footer";

class SwapRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swaprequester: "",
      vanowner: "",
      van: "",
      startdate: "",
      enddate: "",
      additionalInfo: "",
      errorMessage: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      swaprequester: localStorage.getItem("currentuser"),
      vanowner: localStorage.getItem("vanowner"),
      van: localStorage.getItem("van_id"),
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    createswap({
      swaprequester: this.state.swaprequester,
      vanowner: this.state.vanowner,
      van: this.state.van,
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      additionalInfo: this.state.additionalInfo,
    })
      .then((response) =>
        response.swap
          ? this.props.history.push("/allvans")
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { startdate, enddate, additionalInfo, errorMessage } = this.state;
    return (
      <div>
        <NavBarBlank></NavBarBlank>
        <div className="titlecontainer">
          <h1>Swap Request</h1>
        </div>
        <div className="signup">
          {errorMessage !== "" && errorMessage}
          <form className="signupform" onSubmit={this.handleSubmit}>
            <label className="signuplabel">Start Date </label>
            <input
              className="signupinput"
              name="startdate"
              value={startdate}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <label className="signuplabel">End Date </label>
            <input
              className="signupinput"
              name="enddate"
              value={enddate}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <label className="signuplabel">Additional Information </label>
            <textarea
              className="signuptextarea"
              rows="15"
              cols="25"
              name="additionalInfo"
              value={additionalInfo}
              onChange={this.handleChange}
              required={true}
            />
            <button className="signupbutton" type="submit">
              {" "}
              Send request{" "}
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default SwapRequest;
