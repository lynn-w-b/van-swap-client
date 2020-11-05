import React from "react";
import { Route, Link} from 'react-router-dom';
import './vanView.css';

class VanView extends React.Component {
    constructor({_id, make, model, year, location, van_id}) {
        super(_id, make, model, year, location, van_id);
        this.state = {
          _id,
          make,
          model,
          year,
          location, 
          van_id
        };
      };

onClickHandler = () => {
  localStorage.setItem("van_id", this.state.van_id);
};

render () {
const {make, model, year, location} = this.state;
  return (
    <div>
    <Route>
        <Link to={'/vandetails'} style={{'textDecoration':'none', 'color':'white'}} onClick={this.onClickHandler}>
        <div className="vanviewbox">
            <p>Make: {make && this.state.make}</p>
            <p>Model: {model && this.state.model}</p>
            <p>Year: {year && this.state.year}</p>
            <p>Location: {location && this.state.location}</p>
        </div>
        </Link>
        </Route>
    </div>
  );
};
};

export default VanView;