import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './myVan.css';
import {getvan} from "../../services/vanService";

class MyVan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      van: {make:'Please enter the make of your van',
            model:'Please enter the model of your van',
            year:'Please enter the year of your van',
            location:'Please enter the location of your van',
            about:'Please enter additional information about your van'}
    }
  }

componentDidMount = () => {
    if (this.state.user) {
      console.log("User for my van is: ", this.state.user )
      getvan({user:this.state.user})
        .then((response) => {
          console.log("Response from getvan service is:", response)
                this.setState({
                  van: 
                  {make: response.Van.make,
                  model: response.Van.model,
                year: response.Van.year,
              location: response.Van.location,
            about: response.Van.about}
              });
            })
        .catch((err) => console.log(err))
            }}

  render() {
  return (
    <div>
    <NavBar button1="My Profile" link1="/" button2="Search Vans" link2="/allvans" button3="Log-out" link3="/logout"></NavBar>
    <div className="titlecontainer">
      <h1>My Van</h1>
      <Route>
      <Link to={"/editvan"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton"><img src="/2_-_1_-_Pencil.jpg" alt="Edit van details"/></button></Link>
      </Route>
    </div>
    <div className="textbox">
      <p>Make: {this.state.van.make}</p>
      <p>Model: {this.state.van.model}</p>
      <p>Year: {this.state.van.year}</p>
      <p>Location: {this.state.van.location}</p>
      <p>Details: {this.state.van.about}</p>
    {/* <p>Make: {make && props.van.makeandmodel}</p>
      <p>Year: {year && props.van.year}</p>
      <p>Location: {location && props.van.location}</p>
      <p>Details: {details && props.van.details}</p> */}
    </div>
    <Footer></Footer>
    </div>
  );
    };
};

export default MyVan;
