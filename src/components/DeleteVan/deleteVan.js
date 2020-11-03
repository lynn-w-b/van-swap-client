import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import './deleteVan.css';
import {deletevan} from "../../services/vanService";


class DeleteVan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          id: this.props.user.van,
          errorMessage: ''
    }
  }

   handleSubmit = (event) => {
     event.preventDefault();
     deletevan({
       id: this.state.id
     })
       .then((response) =>
         response
           ? this.props.history.push("/")
           : this.setState({
               errorMessage: response.errorMessage,
             })
       )
       .catch((err) => console.log(err));
   }

  render() {
  return (
    <div>
    <NavBar button1="Home" link1="/" button2="Back" link2="/myvan" button3="Log-out" link3="/logout"></NavBar>
        <div className="titlecontainer">
           <h1>Delete Van</h1>
         </div>
       <div className="signup">
         {this.state.errorMessage !== "" && this.state.errorMessage}
        <form className="signupform" onSubmit={(e) => this.handleSubmit(e)}>
          <p>Are you sure you would like to delete your van details? This process is irreversible!!</p>
           <button className="signupbutton" type="submit"> Delete Van </button>
         </form>
         </div>
         <Footer></Footer>
       </div>
     );
   };
 }

export default DeleteVan;