import React from "react";
import Board from "./board";
import { useState } from "react";
import { useEffect } from "react";
import StartUp from "./startUp";
import GameInfo from "./gameInfo";
import Completed from "./completed";

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
  const [done, setDone] = useState(false);
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
      if (curLevel.level === 3 && curLevel.round === 3) {
        setDone(true);
      }
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
          {!done ? (
            <>
              <Board
                alphas={alphas}
                onClick={onClick}
                target={target}
                solution={solution}
              />
              <GameInfo
                target={target}
                count={count}
                correct={correct}
                wrong={wrong}
                onNext={onNext}
                setCount={setCount}
                onRetry={onRetry}
              />
            </>
          ) : (
            <Completed />
          )}
        </div>
      ) : (
        <StartUp setCount={setCount} setReady={setReady} />
      )}
    </div>
  );
};

export default Game;
