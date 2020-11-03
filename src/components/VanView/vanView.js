import React from "react";
import { Route, Link} from 'react-router-dom';
import './vanView.css';

const VanView = (props) => {
    console.log(props);
  const { _id, make, model, year, location } = props;
  console.log(_id, make, model, year, location);
  return (
    <div>
    <Route>
        <Link to={`/van/details:${_id}`} style={{'textDecoration':'none', 'color':'white'}}>
        <div className="vanviewbox">
            <p>Make: {make && props.make}</p>
            <p>Model: {model && props.model}</p>
            <p>Year: {year && props.year}</p>
            <p>Location: {location && props.location}</p>
        </div>
        </Link>
    </Route>
    </div>
  );
};

export default VanView;