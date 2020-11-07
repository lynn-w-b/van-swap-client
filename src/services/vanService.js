import axios from "axios";

export const service = axios.create({
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

export const getvan = ({user}) => {
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

export const vandetails = ({ id }) => {
  console.log("vandetails, van=", id)
  return service
  .get(`van/details/${id}`)
  .then((response) => response.data)
  .catch((err) => {
      console.log(err);
  });
};

export const createswap = ({
  swaprequester,
  vanowner,
  van,
  startdate,
  enddate,
  additionalInfo}) => {
  console.log("createswap being triggered", 
  swaprequester,
  vanowner,
  van,
  startdate,
  enddate,
  additionalInfo);
  return service
  .post(`/van/swaprequest/${van}`, 
    {swaprequester,
      vanowner,
      van,
      startdate,
      enddate,
      additionalInfo})
  .then((response) => response.data)
  .catch((err) => console.log(err))
};

export function uploadImage(image) {
  const uploadData = new FormData();

  uploadData.append("image", image);
  return service
    .post("/van/upload/image", uploadData)
    .then(({ data }) => data)
    .catch(console.error);
};

export function addMultipleImages(images) {
  const uploadData = new FormData();

  for (let image of images) {
    uploadData.append("imageArray", image);
  }

  return service
  .post("/van/upload/multi", uploadData)
  .then(({data}) => data)
  .catch(console.error);
};
