import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const newvan = ({ user, make, model, year, location, about }) => {
  return service
    .post("/van/newvan", { user, make, model, year, location, about })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export const getvan = ({ user }) => {
    console.log("getvan, van=", user.van)
    return service
    .get(`van/myvan/${user.van}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err);
    });
};

export const editvan = ({
  id,
  make,
  model,
  year,
  location,
  about}) => {
  console.log("editvan being triggered", 
  id, 
  make,
  model,
  year,
  location,
  about);
  return service
  .post(`/van/editvan/${id}`, 
    {id, 
    make,
    model,
    year,
    location,
    about})
  .then((response) => response.data)
  .catch((err) => console.log(err))
}

export const deletevan = ({id}) => {
    return service
    .delete(`/van/delete/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log(err))
  }

export const allvans = () => {
    return service
    .get('/van/allvans')
    .then((response) => response.data)
    .catch((err) => console.log(err))
};

export const vandetails = ({ _id }) => {
  console.log("vandetails, van=", _id)
  return service
  .get(`van/details/${_id}`)
  .then((response) => response.data)
  .catch((err) => {
      console.log(err);
  });
};