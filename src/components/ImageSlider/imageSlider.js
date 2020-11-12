import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  // takes in images as props
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    images.length > 0 && (
      <div>
        <button onClick={slideLeft}>{"<"}</button>
        <img src={images[index]} alt={index} />
        <button onClick={slideRight}>{">"}</button>
      </div>
    )
  );
};

export default ImageSlider;
