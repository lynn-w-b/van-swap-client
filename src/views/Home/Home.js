import React from "react";
import { Route, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import Swap from "../../components/Swap/swap.js";
import Swapgot from "../../components/Swapgot/swapgot.js";
import { getswapsrequested } from "../../services/vanService";
import { getswapsreceived } from "../../services/vanService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swaps: [],
      swapsgot: [],
    };
  }

  componentDidMount = () => {
    getswapsrequested({ id: this.props.user._id })
      .then((response) => {
        console.log("response from getswapsrequested=", response.Swaps);
        this.setState({
          swaps: [...response.Swaps],
        });
        console.log("swapsrequested=", this.state.swaps);
      })
      .catch((err) => console.log(err));
    getswapsreceived({ id: this.props.user._id })
      .then((response) => {
        console.log("response from getswapsreceived=", response.Swapsgot);
        this.setState({
          swapsgot: [...response.Swapsgot],
        });
        console.log("swapsgot=", this.state.swapsgot);
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { fullname, dateofbirth, location, about, image } = this.props.user;
    const swapdetails = this.state.swaps.map((swap) => {
      return (
        <Swap
          van={swap.van}
          startdate={swap.startdate}
          enddate={swap.enddate}
          additionalinfo={swap.additionalInfo}
          vanowner={swap.vanowner}
          accepted={swap.accepted}
          id={swap._id}
          key={swap._id}
        ></Swap>
      );
    });
    const swapgotdetails = this.state.swapsgot.map((swapgot) => {
      return (
        <Swapgot
          startdate={swapgot.startdate}
          enddate={swapgot.enddate}
          additionalinfo={swapgot.additionalInfo}
          swaprequester={swapgot.swaprequester}
          accepted={swapgot.accepted}
          id={swapgot._id}
          key={swapgot._id}
        ></Swapgot>
      );
    });
    return (
      <div>
        <NavBar
          button1="My Van"
          link1="/myvan"
          button2="Search Vans"
          link2="/allvans"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        <div className="titlecontainer">
          <h1>My Profile</h1>
          <Route>
            <Link
              to={"/editprofile"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="editbutton">
                <img src="/2_-_1_-_Pencil.jpg" alt="Edit profile" />
              </button>
            </Link>
          </Route>
        </div>
        <div className="textbox">
          <p>Name: {fullname && this.props.user.fullname}</p>
          <p>DOB: {dateofbirth && this.props.user.dateofbirth}</p>
          <p>Location: {location && this.props.user.location}</p>
          <p>Details: {about && this.props.user.about}</p>
          <img src={image && this.props.user.image} alt="van" />
        </div>
        <div className="titlecontainer">
          <h1>Swap Requests Received</h1>
        </div>
        {swapgotdetails}
        <div className="titlecontainer">
          <h1>Swap Requests Sent</h1>
        </div>
        {swapdetails}
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
