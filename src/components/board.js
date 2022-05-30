import React from "react";
import Square from "./square";

const Board = ({ alphas, onClick }) => {
  return (
    <div id="grid">
      {alphas.map((row, xIndex) => {
        return (
          <div key={xIndex} id="row">
            {row.map((alpha, yIndex) => {
              return (
                <div key={xIndex * 7 + yIndex + 176}>
                  <Square
                    value={alpha}
                    index={[xIndex, yIndex]}
                    onClick={onClick}
                  />
                </div>
              );
            })}
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default Board;
