const StartUp = ({ setReady, setCount }) => {
  return (
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
  );
};

export default StartUp;
