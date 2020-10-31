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
    console.log("getvan, user=", user)
    return service
    .get(`/myvan/:${user.van}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err);
    });
};

export const editvan = ({_id}) => {
  return service
  .post("/van/edit", {_id})
  .then((response) => response.data)
  .catch((err) => console.log(err))
}

export const deletevan = ({_id}) => {
    return service
    .post("/van/delete", {_id})
    .then((response) => response.data)
    .catch((err) => console.log(err))
  }