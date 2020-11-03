import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {vandetails} from "../../services/vanService";

class VanDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        id:'',
      make:'',
      model:'',
      year:'',
      location:'',
      about:'',
      owner:{}
    }
  }

componentDidMount = () => {
      vandetails({id:this.req.params})
        .then((response) => {
          console.log("Response from getvan service is:", response);
                this.setState({
                  make: response.Van.make,
                  model: response.Van.model,
                year: response.Van.year,
              location: response.Van.location,
            about: response.Van.about,
            owner: response.Van.populate("owner")
              });
            })
        .catch((err) => console.log(err))
            }

  render() {
  return (
    <div>
    <NavBar button1="My Profile" link1="/" button2="Search Vans" link2="/allvans" button3="Log-out" link3="/logout"></NavBar>
    <div className="titlecontainer">
      <h1>Van Details</h1>
      <Route>
      <Link to={"/swaprequest"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton">Make A Swap Request</button></Link>
      </Route>
    </div>
    <div className="textbox">
      <p>Make: {this.state.make}</p>
      <p>Model: {this.state.model}</p>
      <p>Year: {this.state.year}</p>
      <p>Location: {this.state.location}</p>
      <p>Details: {this.state.about}</p>
      <p>Owner: {this.state.owner.fullname}</p>
      <p>About the owner: {this.state.owner.about}</p>
    </div>
    <Footer></Footer>
    </div>
  );
    };
};

export default VanDetails;
