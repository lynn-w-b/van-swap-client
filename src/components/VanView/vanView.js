import React from "react";
import { Route, Link} from 'react-router-dom';

const VanView = (props) => {
  const { _id, make, model, year, location } = props;
  return (
    <div>
    <Route>
        <Link to={`/van/details:${_id}`} style={{'textDecoration':'none', 'color':'white'}}>
        <div className="textbox">
            <p>Make: {make && props.van.make}</p>
            <p>Model: {model && props.van.model}</p>
            <p>Year: {year && props.van.year}</p>
            <p>Location: {location && props.van.location}</p>
        </div>
        </Link>
    </Route>
    </div>
  );
};

export default VanView;