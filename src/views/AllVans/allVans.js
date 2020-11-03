import React from "react";
import { Route, Link} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './allVans.css';
import {allvans} from "../../services/vanService";
import VanView from "../../components/VanView/vanView";

class AllVans extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      vans:[]
    }
  }

componentDidMount = () => {
    if (this.state.vans) {
      allvans()
        .then((response) => {
          console.log("Response from allvans service is:", response)
                this.setState({
                  vans:[response.vans]
              });
            })
        .catch((err) => console.log(err))
            }}

  render() {
    const vans = this.state.vans.map((van) =>
    <VanView _id={van._id} make={van.make} model={van.model} year={van.year} location={van.location}></VanView>
    );
  return (
    <div>
    <NavBar button1="My Profile" link1="/" button2="My Van" link2="/myvan" button3="Log-out" link3="/logout"></NavBar>
    <div className="titlecontainer">
      <h1>Search Vans</h1>
      <Route>
      <Link to={"/searchvan"} style={{'textDecoration':'none', 'color':'white'}}><button className="editbutton">Search</button></Link>
      </Route>
    </div>
    <ul>
        {vans}
    </ul>
    <Footer></Footer>
    </div>
  );
    };
};

export default AllVans;