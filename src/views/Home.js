import React from "react";

const Home = (props) => {
  const { username } = props.user;
  return (
    <div>
      <h1>welcome {username && props.user.username}</h1>
    </div>
  );
};

export default Home;
