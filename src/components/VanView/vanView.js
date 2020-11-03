import React from "react";
import { Route, Link} from 'react-router-dom';
import './vanView.css';
import {vandetails} from '../../services/vanService';
import VanDetails from '../../views/VanDetails/vanDetails';

class VanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          _id: this.props._id,
          make: this.props.make,
          model: this.props.model,
          year: this.props.year,
          location: this.props.location,
          about: "",
          owner:{}
        };
      };
  
  onClickHandler = () => {
      vandetails(this.state._id)
      .then((response) => {
        console.log("Response from vandetails service is:", response);
              this.setState({
          about: response.Van.about,
          owner: response.Van.populate("owner")
            })
          .then((response) => {
          return <Route exact path="/van/details/:id"
          component={VanDetails} make={this.state.make} model={this.state.model} year={this.state.year} location={this.state.location} about={this.state.about} owner={this.state.owner}></Route>})
          .catch((err) => console.log(err))
          })
      .catch((err) => console.log(err))
      }

render () {
const {make, model, year, location} = this.state;
  return (
    <div>
    <Route>
        <Link to={`/van/details:${this.state._id}`} style={{'textDecoration':'none', 'color':'white'}} onClick={this.onClickHandler}>
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