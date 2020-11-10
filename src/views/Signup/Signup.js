import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { signup } from "../../services/userService";
import NavBarBlank from "../../components/NavBarBlank/NavBarBlank";
import Footer from "../../components/Footer/Footer";
import "./Signup.css";
import { uploadImage } from "../../services/userService";
// import ErrorMessage from "./errorMessage";

const Signup = (props) => {
  // const {
  //   register,
  //   handleSubmit,
  //   errors,
  //   formState: { isSubmitting },
  // } = useForm();
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [dateofbirth, setDateofbirth] = useState("");
  // const [location, setLocation] = useState("");
  // const [about, setAbout] = useState("");
  // const [values, setValues] = useState({
  //   fullname: "",
  //   email: "",
  //   password: "",
  //   dateofbirth: "",
  //   location: "",
  //   about: "",
  //   errorMessage: "",
  // });
  // const [state, setState] = useState({
  //   fullname: "",
  //   email: "",
  //   password: "",
  //   dateofbirth: "",
  //   location: "",
  //   about: "",
  //   image: "",
  //   errorMessage: ""
  // });
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const validateImageUpload = async (value) => {
  //   await sleep(1000);
  //   if (!value) {
  //     setError("image", "validateUpload");
  //   } else {
  //     clearError("image");
  //   }
  // };
  const handleChange1 = (event) => {
    setFullname(event.target.value);
    console.log("fullname=", { fullname });
  };
  const handleChange2 = (event) => {
    setEmail(event.target.value);
    console.log("email=", { email });
  };
  const handleChange3 = (event) => {
    setPassword(event.target.value);
  };
  const handleChange4 = (event) => {
    setDateofbirth(event.target.value);
  };
  const handleChange5 = (event) => {
    setLocation(event.target.value);
  };
  const handleChange6 = (event) => {
    setAbout(event.target.value);
  };
  // const addImage = (res) => {
  //   setImage(res);
  //   console.log("addimage=", { image });
  // };

  const addImage = (image) => {
    setImage({ image });
    console.log("setImage=", { image });
  };

  // const addItem = () => {
  //   const {
  //     fullname,
  //     email,
  //     password,
  //     dateofbirth,
  //     location,
  //     about,
  //     errorMessage,
  //   } = values;
  //   if (!fullname || !email || !password || !dateofbirth || !location || !about)
  //     return;
  //   saveItem(values);
  // };

  const handleSubmit = (event) => {
    // await sleep(3000);
    console.log(
      "signup props=",
      { fullname },
      { email },
      { password },
      { dateofbirth },
      { location },
      { about },
      image
    );
    signup(
      { fullname },
      { email },
      { password },
      { dateofbirth },
      { location },
      { about },
      { image }
    )
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            console.log("new user details", response.user),
            this.props.authenticate(response.user),
            this.props.history.push("/newvan"))
          : setErrorMessage(response.errorMessage)
      )
      .catch((err) => console.log(err));
  };

  const handleImageUpload = (event) => {
    uploadImage(event.target.files[0])
      .then((res) => {
        console.log("image response:", res);
        addImage(res);
      })
      .catch(console.error);
  };

  return (
    <div>
      <NavBarBlank></NavBarBlank>
      <div className="titlecontainer">
        <h1>Your Profile</h1>
      </div>
      <div className="signup">
        {errorMessage !== "" && errorMessage}
        <form className="signupform" onSubmit={handleSubmit}>
          <label className="signuplabel">Full Name </label>
          <input
            className="signupinput"
            name="fullname"
            // ref={register({ required: true })}
            value={fullname}
            onChange={handleChange1}
            required={true}
            type="text"
          />
          {/* <ErrorMessage error={errors.fullname} /> */}
          <label className="signuplabel">Email </label>
          <input
            className="signupinput"
            name="email"
            // ref={register({ required: true })}
            value={email}
            onChange={handleChange2}
            required={true}
            type="email"
          />
          {/* <ErrorMessage error={errors.fullname} /> */}
          <label className="signuplabel">Password </label>
          <input
            className="signupinput"
            name="password"
            type="password"
            // ref={register({
            //   required: true,
            //   pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
            // })}
            value={password}
            onChange={handleChange3}
            required={true}
          />
          {/* <ErrorMessage error={errors.password} /> */}
          <label className="signuplabel">Date of Birth </label>
          <input
            className="signupinput"
            name="dateofbirth"
            value={dateofbirth}
            onChange={handleChange4}
            required={true}
            type="text"
            // ref={register({ required: true })}
          />
          {/* <ErrorMessage error={errors.password} /> */}
          <label className="signuplabel">Location </label>
          <input
            className="signupinput"
            name="location"
            value={location}
            onChange={handleChange5}
            required={true}
            type="text"
            // ref={register({ required: true })}
          />
          {/* <ErrorMessage error={errors.location} /> */}
          <label className="signuplabel">About Me </label>
          <textarea
            className="signuptextarea"
            rows="15"
            cols="25"
            name="about"
            value={about}
            onChange={handleChange6}
            required={true}
            // ref={register({ required: true })}
          />
          {/* <ErrorMessage error={errors.location} /> */}
          <label className="signuplabel">Image </label>
          <input
            className="signupinput"
            name="image"
            type="file"
            // value={image}
            onChange={handleImageUpload}
          />
          {/* <ErrorMessage error={errors.image} /> */}
          <button className="signupbutton" type="submit">
            Sign up
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
