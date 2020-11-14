import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./allVans.css";
import { allvans } from "../../services/vanService";
import VanView from "../../components/VanView/vanView";

class AllVans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vans: [],
      inputValue: "",
    };
  }

  componentDidMount = () => {
    allvans()
      .then((response) => {
        console.log("Response from allvans service is:", response);
        this.setState({
          vans: [...response.vans],
        });
      })
      .catch((err) => console.log(err));
  };

  vansFilterOnChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  dynamicSearch = () => {
    return this.state.vans.filter((van) =>
      van.location.toLowerCase().includes(this.state.inputValue.toLowerCase())
    );
  };

  render() {
    const vans = this.dynamicSearch().map((van) => (
      <VanView
        _id={van._id}
        make={van.make}
        model={van.model}
        year={van.year}
        location={van.location}
        image={van.images[0]}
        key={van._id}
      ></VanView>
    ));

    return (
      <div className="allvans">
        <NavBar
          button1="My Profile"
          link1="/"
          button2="My Van"
          link2="/myvan"
          button3="Log-out"
          link3="/logout"
        ></NavBar>
        <div className="titlecontainer spreadout">
          <h1 className="searchTitle">Search Vans</h1>
          <img className="sun" src="/sun.svg" alt=""/>
          <p className="funky">(for your next holiday!!)</p>
          <label className="searchLabel" htmlFor="search">
            Search by location
          </label>
          <input
            className="searchInput"
            type="text"
            name="searchInput"
            value={this.state.inputValue}
            onChange={this.vansFilterOnChange}
          />
        </div>
        <ul>{vans}</ul>
        <Footer></Footer>
      </div>
    );
  }
}

export default AllVans;
