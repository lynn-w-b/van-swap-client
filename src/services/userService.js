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
export const signup = (body) => {
  console.log("signup service being triggered", body);
  return service
    .post("/user/signup", body)
    .then((response) => response.data)
    .catch((err) => err);
};

export const login = ({ email, password }) => {
  return service
    .post("/user/login", { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = ({ accessToken }) => {
  console.log("userservice being triggered", accessToken);
  return service
    .post("/user/logout", { accessToken })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const editprofile = ({
  id,
  fullname,
  email,
  password,
  dateofbirth,
  location,
  about,
  image,
}) => {
  console.log("editprofile being triggered", {
    id,
    fullname,
    email,
    password,
    dateofbirth,
    location,
    about,
    image,
  });
  return service
    .post(`/user/editprofile/${id}`, {
      id,
      fullname,
      email,
      password,
      dateofbirth,
      location,
      about,
      image,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const deleteuser = ({ id }) => {
  return service
    .delete(`/user/delete/${id}`)
    .then((response) => response.Van._id)
    .catch((err) => console.log(err));
};

export const deletesession = ({ id }) => {
  return service
    .delete(`user/delete/session/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

// export const getuserdetails = ({id}) => {
//   return service
//   .get(`user/getdetails/${id}`)
//   .then((response) => response.data)
//   .catch((err) => console.log(err))
// }

export function uploadImage(image) {
  const uploadData = new FormData();

  uploadData.append("image", image);
  return service
    .post("/user/upload/image", uploadData)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(console.error);
}
// export const uploadImage = async (image) => {
//   const uploadData = new FormData();
//   uploadData.append("image", image);
// try {
//     let response = await service
//     .post("/user/upload/image", uploadData);
//     const {data} = response;
//     return data;
//   } catch(err) {
//      console.log(err)
//   }
// }

export function addMultipleImages(images) {
  const uploadData = new FormData();

  for (let image of images) {
    uploadData.append("imageArray", image);
  }

  return service
    .post("/user/upload/multi", uploadData)
    .then(({ data }) => data)
    .catch(console.error);
}

export const userdetails = ({ id }) => {
  console.log("userdetails being triggered", id);
  return service
    .get(`user/details/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};
