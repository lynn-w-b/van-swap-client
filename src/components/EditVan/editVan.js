import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './editVan.css';
import {editvan} from "../../services/vanService";
import {getvan} from "../../services/vanService";


class EditVan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          user: this.props.user,
          id: this.props.user.van,
          make: '',
          model: '',
          year: '',
          location: '',
          about: '',
          errorMessage: ''
    }
  }

  componentDidMount = () => {
    if (this.state.user) {
      console.log("User for my van is: ", this.state.user )
      getvan({user:this.state.user})
        .then((response) => {
          console.log("Response from getvan service is:", response)
                this.setState({
                  make: response.Van.make,
                  model: response.Van.model,
                year: response.Van.year,
              location: response.Van.location,
            about: response.Van.about});
              })
        .catch((err) => console.log(err))
            }}

   handleChange = (event) => {
     const { name, value } = event.target;
     this.setState({
       [name]: value,
     });
   };
   handleSubmit = (event) => {
     event.preventDefault();
     editvan({
       id: this.state.id,
       make: this.state.make,
       model: this.state.model,
       year: this.state.year,
       location: this.state.location,
       about: this.state.about
       // image: this.state.user.image
     })
       .then((response) =>
         response
           ? this.props.history.push("/myvan")
           : this.setState({
               errorMessage: response.errorMessage,
             })
       )
       .catch((err) => console.log(err));
   }

  render() {
    const { make, model, year, location, about, errorMessage } = this.state;
  return (
    <div>
    <NavBar button1="Back" link1="/myvan" button2="Delete Van" link2="/deletevan" button3="Log-out" link3="/logout"></NavBar>
        <div className="titlecontainer">
           <h1>Edit Van Details</h1>
         </div>
       <div className="signup">
         {errorMessage !== "" && errorMessage}
        <form className="signupform" onSubmit={(e) => this.handleSubmit(e)}>
          <label className="signuplabel">Make </label>
           <input className="signupinput"
             name="make"
             value={make}
             onChange={(e) => this.handleChange(e)}
             type="text"
           />
           <label className="signuplabel">Model </label>
           <input className="signupinput"
             name="model"
             value={model}
             onChange={(e) => this.handleChange(e)}
             type="text"
           />
           <label className="signuplabel">Year </label>
           <input className="signupinput"
             name="year"
             value={year}
             onChange={(e) => this.handleChange(e)}
             type="text"
           />
           <label className="signuplabel">Location </label>
           <input className="signupinput"
             name="location"
             value={location}
             onChange={(e) => this.handleChange(e)}
             type="text"
           />
           <label className="signuplabel">About Your Van </label>
           <textarea className="signuptextarea"
           rows="15"
           cols="25"
           name="about"
           value={about}
           onChange={(e) => this.handleChange(e)}
           />
           {/* <label className="signuplabel">Image </label>
           <input className="signupinput"
           name="image"
           type="file"
           value={image}
           onChange={this.handleChange}
           required={true}
           /> */}
           <button className="signupbutton" type="submit"> Save changes </button>
         </form>
         </div>
         <Footer></Footer>
       </div>
     );
   };
 }

export default EditVan;