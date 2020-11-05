import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {vandetails} from "../../services/vanService";


class VanDetails extends React.Component {
  constructor({id}){
    super(id);
    this.state = {
      id,
      make:'',
      model:'',
      year:'',
      location:'',
      about:'',
      owner:{
        fullname:'',
        about:''
      }
    };
  };


componentDidMount = () => {
      vandetails({_id: this.state.id})
        .then((response) => {
          console.log("Response from vandetails service is:", response);
          this.setState({
            make: response.Van.make,
            model: response.Van.model,
            year: response.Van.year,
            location: response.Van.location,
            about: response.Van.about,
            owner:{
              fullname: response.Van.owner.fullname,
              about: response.Van.owner.about
            }
          });
            })
        .catch((err) => console.log(err))
            };

  onClickHandler = () => {
    localStorage.removeItem("van_id");
  }
            
  render (){
  return (
    <div>
    <NavBar button1="My Profile" link1="/" button2="Search Vans" link2="/allvans" button3="Log-out" link3="/logout"></NavBar>
    <Route>
    <div className="titlecontainer">
      <h1>Van Details</h1>
      <Link to={"/swaprequest"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton">Make A Swap Request</button></Link>
    </div>
    <div className="textbox">
      <p>Make: {this.state.make}</p>
      <p>Model: {this.state.model}</p>
      <p>Year: {this.state.year}</p>
      <p>Location: {this.state.location}</p>
      <p>Details: {this.state.about}</p>
      <p>Owner: {this.state.owner.fullname}</p>
      <p>About the owner: {this.state.owner.about}</p>
      <Link to={"/allvans"} style={{'textDecoration':'none', 'color':'white'}}><button type="submit" onClick={this.onClickHandler}>Back</button></Link>
    </div>
    </Route>
    <Footer></Footer>
    </div>
  );
    };
}

export default VanDetails;
