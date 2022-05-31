import { AutoCounter } from "./timer.tsx";

const GameInfo = ({
  target,
  count,
  correct,
  wrong,
  onNext,
  setCount,
  onRetry,
}) => {
  return (
    <>
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
    </>
  );
};

export default GameInfo;
