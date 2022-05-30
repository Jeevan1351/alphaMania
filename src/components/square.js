import React from "react";

const Square = ({ index, value, onClick }) => {
  return (
    <>
      <button onClick={() => onClick(value, index)} id={index}>
        {value}
      </button>
    </>
  );
};

export default Square;
