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
            <div class="panel panel-warning">
  <div class="panel-heading centred">
    <h3 class="panel-title">{location && this.state.location}</h3>
  </div>
  <div class="panel-body spreadout">
  <div className="largefont">
  <p>{make && this.state.make}</p>
              <p>{model && this.state.model}</p>
              <p>{year && this.state.year}</p>
              </div>
              <div>
              <img className="photo" src={image && this.state.image} alt="" />
              </div>
  </div>
</div>
</div>
          </Link>
        </Route>
      </div>
    );
  }
}

export default VanView;
