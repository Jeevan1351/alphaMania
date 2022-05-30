import React from "react";
import Board from "./board";
import { useState } from "react";
import { useEffect } from "react";
import { AutoCounter } from "./timer.tsx";

const genRandInt = (max) => {
  return Math.floor(Math.random() * max);
};

const pickTarget = () => {
  const alphaSet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let targetIndex = genRandInt(26);
  return [alphaSet[targetIndex], targetIndex];
};

const pickAlphas = (randomSet) => {
  var pickedElementIndex = genRandInt(25);
  return randomSet[pickedElementIndex];
};

const genAlphas = (level) => {
  const alphaSet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const levelSize = { 1: 8, 2: 12, 3: 20 };
  const [target, targetIndex] = pickTarget();
  let randomSet = alphaSet;
  randomSet.splice(targetIndex, 1);
  console.log(randomSet);
  var tempAlphas = Array(levelSize[level]);
  if (level) {
    for (let i = 0; i < levelSize[level]; i++) {
      var row = Array(levelSize[level]);
      tempAlphas[i] = row;
    }
    for (let i = 0; i < levelSize[level]; i++) {
      for (let j = 0; j < levelSize[level]; j++) {
        tempAlphas[i][j] = pickAlphas(randomSet);
      }
    }
    let soln = [
      [genRandInt(levelSize[level]), genRandInt(levelSize[level])],
      [genRandInt(levelSize[level]), genRandInt(levelSize[level])],
    ];
    tempAlphas[soln[0][0]][soln[0][1]] = target;
    tempAlphas[soln[1][0]][soln[1][1]] = target;

    return [tempAlphas, soln, target];
  }
};

const Game = () => {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [curLevel, setCurLevel] = useState({ level: 1, round: 1 });
  const onClick = (value, index) => {
    if (correct || wrong) return;
    console.log(`Click  index: ${index} solns: ${solution[0]}, ${solution[1]}`);
    if (
      ((index[0] === solution[0][0] && index[1] === solution[0][1]) ||
        (index[0] === solution[1][0] && index[1] === solution[1][1])) &&
      setCorrect !== true &&
      count > 0
    ) {
      console.log("Success", count);
      setCorrect(true);
    } else {
      setWrong(true);
    }
  };

  const resetRound = () => {
    setCount(10);
    setCorrect(false);
    setWrong(false);
  };

  const onNext = () => {
    var tempLevel = curLevel;
    if (tempLevel.round < 3)
      setCurLevel({ level: tempLevel.level, round: tempLevel.round + 1 });
    else if (tempLevel.level)
      setCurLevel({ level: tempLevel.level + 1, round: 1 });
    console.log(curLevel);
    resetRound();
  };

  const onRetry = () => {
    var tempLevel = curLevel;
    setCurLevel({ level: tempLevel.level, round: 1 });
    resetRound();
  };
  const [solution, setSolution] = useState(Array(2));
  const [alphas, setAlphas] = useState(Array(5));
  const [target, setTarget] = useState("-");
  useEffect(() => {
    let [newAlphas, newSolution, newTarget] = genAlphas(curLevel.level);
    setAlphas(newAlphas);
    setSolution(newSolution);
    setTarget(newTarget);
  }, [curLevel]);
  return (
    <div>
      {ready ? (
        <div id="game">
          <Board
            alphas={alphas}
            onClick={onClick}
            target={target}
            solution={solution}
          />
          <div id="text">
            {count > 0 ? (
              <>
                <p>Let's Go</p>
              </>
            ) : (
              <>
                <p>Time UP!</p>
              </>
            )}
            <p>Find the target alphabet " {target} "</p>
            {correct && !wrong ? (
              <>
                <p>Success</p>
                <button id="main" onClick={onNext}>
                  Next
                </button>
              </>
            ) : (
              <>
                {!wrong && count > 0 ? (
                  <AutoCounter
                    count={count}
                    setCount={setCount}
                    stopRun={correct}
                  />
                ) : (
                  <>
                    {wrong ? (
                      <>
                        <p>Wrong</p>
                      </>
                    ) : (
                      <></>
                    )}
                    <button id="main" onClick={() => onRetry()}>
                      Retry
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div id="startUp">
            <h2>AlphaMania</h2>
            <button
              id="main"
              onClick={() => {
                setReady(true);
                setCount(15);
              }}
            >
              Start Game
            </button>
            <div>
              <p>
                Choose the target alphabet mentioned on the screen from the grid
                before the timer runs out!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
