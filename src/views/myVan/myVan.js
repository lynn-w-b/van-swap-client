import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBarBlank from "../../components/NavBarBlank/NavBarBlank";
import Footer from "../../components/Footer/Footer";
import './myVan.css';
import {getvan} from "../../services/vanService";

componentDidMount = () => {
    if (this.props.user) {
      getvan(this.props.user)
        .then((response) => {
                const {van} = response.van;
              })
        .catch((err) => console.log(err));
            }}

const MyVan = (props) => {
    
  return (
    <div>
    <NavBarBlank></NavBarBlank>
    <div className="titlecontainer">
      <h1>My Van</h1>
      <Route>
      <Link to={"/editvan"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton"><img src="/2_-_1_-_Pencil.jpg" alt="Edit van details"/></button></Link>
      </Route>
    </div>
    <div className="textbox">
      <p>Make: {van.make}</p>
      <p>Model: {van.model}</p>
      <p>Year: {van.year}</p>
      <p>Location: {van.location}</p>
      <p>Details: {van.about}</p>
    {/* <p>Make: {make && props.van.makeandmodel}</p>
      <p>Year: {year && props.van.year}</p>
      <p>Location: {location && props.van.location}</p>
      <p>Details: {details && props.van.details}</p> */}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default MyVan;
