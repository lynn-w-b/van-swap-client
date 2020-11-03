import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './deleteProfile.css';
import {deleteuser} from "../../services/userService";
import {deletesession} from "../../services/userService";


class DeleteProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          id: this.props.user._id,
          errorMessage: ''
    }
  }

   handleSubmit = (event) => {
     event.preventDefault();
     deleteuser({
       id: this.state.id
     })
       .then((response) =>
         response
           ? deletesession({
               id: this.state.id
           })
           .then((response) => localStorage.removeItem("accessToken"))
           .then((response) => this.props.history.push("/"))
           .catch((err) => console.log(err))
           : this.setState({
               errorMessage: response.errorMessage,
             })
       )
       .catch((err) => console.log(err));
   }

  render() {
  return (
    <div>
    <NavBar button1="Back" link1="/" button2="My Van" link2="/myvan" button3="Log-out" link3="/logout"></NavBar>
        <div className="titlecontainer">
           <h1>Delete Profile</h1>
         </div>
       <div className="signup">
         {this.state.errorMessage !== "" && this.state.errorMessage}
        <form className="signupform" onSubmit={(e) => this.handleSubmit(e)}>
          <p>Are you sure you would like to delete your user profile? This process is irreversible!!</p>
           <button className="signupbutton" type="submit"> Delete Profile </button>
         </form>
         </div>
         <Footer></Footer>
       </div>
     );
   };
 }

export default DeleteProfile;