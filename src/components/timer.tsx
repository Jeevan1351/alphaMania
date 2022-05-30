import { useEffect, useRef } from "react";

export const AutoCounter = ({ count, setCount }) => {
  const timerRef = useRef<NodeJS.Timeout>();
  // This executes once upon mounting
  // i.e. equivalent to componentDidMount() in a class component
  useEffect(() => {
    // Register a function to increment the count every second
    // and capture the timer handle so we can cancel it later.
    timerRef.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    // Clean up when the component is unmounting
    // i.e. equivalent to componentWillUnmount() in a class
    return () => {
      clearInterval(timerRef.current!);
    };
  }, [timerRef, setCount]);
  return count > 0 ? (
    <div style={{ color: "white" }}>Time left : {count}</div>
  ) : (
    <div>Time left : {0}</div>
  );
};
