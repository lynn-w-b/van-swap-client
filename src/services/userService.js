import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const validateSession = (accessToken) => {
  return service
    .get(`/user/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};
export const signup = ({ fullname, email, password, dateofbirth, location, about }) => {
  return service
    .post("/user/signup", { fullname, email, password, dateofbirth, location, about })
    .then((response) => response.data)
    .catch((err) => err)
};

export const login = ({ email, password }) => {
  return service
    .post("/user/login", { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = ({accessToken}) => {
  console.log("userservice being triggered", accessToken);
  return service
  .post("/user/logout", {accessToken})
  .then((response) => response.data)
  .catch((err) => console.log(err))
};

export const editprofile = ({
  id,
  fullname,
  email,
  password,
  dateofbirth,
  location,
  about}) => {
  console.log("editprofile being triggered", 
  id, 
  fullname,
  email,
  password,
  dateofbirth,
  location,
  about);
  return service
  .post(`/user/editprofile/${id}`, 
    {id, 
    fullname,
    email,
    password,
    dateofbirth,
    location,
    about})
  .then((response) => response.data)
  .catch((err) => console.log(err))
};

export const deleteuser = ({id}) => {
  return service
  .delete(`/user/delete/${id}`)
  .then((response) => response.data)
  .catch((err) => console.log(err))
};

export const deletesession = ({id}) => {
  return service
  .delete(`user/delete/session/${id}`)
  .then((response) => response.data)
  .catch((err) => console.log(err))
}
