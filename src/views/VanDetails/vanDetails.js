import React, {useEffect, useState} from "react";
import { Route, Link, useParams} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {vandetails} from "../../services/vanService";


const VanDetails =(props) => {
  console.log("vandetails props:", props)
  const {id} = useParams();
  console.log("vandetails id:", id);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [fullname, setFullname] = useState('');
  const [details, setDetails] = useState('');
  const [ownerId, setOwnerId] = useState({});

 useEffect (() => {
      vandetails({id})
        .then((response) => {
          console.log("Response from vandetails service is:", response);
          setMake(response.Van.make);
          setModel(response.Van.model);
          setYear(response.Van.year);
          setLocation(response.Van.location);
          setAbout(response.Van.about);
          setFullname(response.Van.owner.fullname);
          setDetails(response.Van.owner.about);
          setOwnerId(response.Van.owner._id);
          })
        .catch((err) => console.log(err))
            });
  
const onClickHandler = () => {
  console.log(`vanowner:${ownerId}, van:${id}`);
    localStorage.setItem("vanowner", ownerId);
    localStorage.setItem("van_id", id);
  }

  
  return (
    <div>
    <NavBar button1="My Profile" link1="/" button2="Search Vans" link2="/allvans" button3="Log-out" link3="/logout"></NavBar>
    <Route>
    <div className="titlecontainer">
      <h1>Van Details</h1>
      <Link to={`/swaprequest/${id}`} style={{'textDecoration':'none', 'color':'white'}} onClick={onClickHandler()}><button className="editbutton" type="submit">Make A Swap Request</button></Link>
    </div>
    <div className="textbox">
      <p>Make: {make}</p>
      <p>Model: {model}</p>
      <p>Year: {year}</p>
      <p>Location: {location}</p>
      <p>Details: {about}</p>
      <p>Owner: {fullname}</p>
      <p>About the owner: {details}</p>
      <Link to={"/allvans"} style={{'textDecoration':'none', 'color':'white'}}><button type="submit">Back</button></Link>
    </div>
    </Route>
    <Footer></Footer>
    </div>
  );
    };


export default VanDetails;
