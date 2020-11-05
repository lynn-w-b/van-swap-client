import React from "react";
import { Route, Link} from 'react-router-dom';
import './vanView.css';

class VanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          _id: this.props._id,
          make: this.props.make,
          model: this.props.model,
          year: this.props.year,
          location: this.props.location
        };
      };

render () {
const {_id, make, model, year, location} = this.state;
  return (
    <div>
    <Route>
        <Link to={`/vandetails/${_id}`} style={{'textDecoration':'none', 'color':'white'}}>
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