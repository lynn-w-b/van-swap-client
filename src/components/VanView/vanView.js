import React from "react";
import { Route, Link } from "react-router-dom";
import "./vanView.css";

class VanView extends React.Component {
  state = {
    _id: this.props._id,
    make: this.props.make,
    model: this.props.model,
    year: this.props.year,
    location: this.props.location,
    image: this.props.image,
  };

  onClickHandler = () => {
    localStorage.setItem("van_id", this.state._id)
  }

  render() {
    console.log(this.props);
    const { _id, make, model, year, location, image } = this.state;
    // localStorage.setItem("van_id", this.state._id);
    return (
      <div>
        <Route>
          <Link
            to={`/vandetails/${_id}`}
            style={{ textDecoration: "none", color: "white" }}
            onClick={this.onClickHandler}
          >
            <div className="vanviewbox">
              <p>Make: {make && this.state.make}</p>
              <p>Model: {model && this.state.model}</p>
              <p>Year: {year && this.state.year}</p>
              <p>Location: {location && this.state.location}</p>
              <img src={image && this.state.image} alt="" />
            </div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default VanView;
