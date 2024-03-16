import React, { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const time = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } 
      else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000; // Convert to seconds

      // We only want two decimals of precision
      elapsedTime = elapsedTime.toFixed(2);

      if(time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);


  return (
    <>
      <div className="interFace">
        <div ref={time} className="time">
          0.00
        </div>

        {phase === "ended" && (
          <>
            <div className="win">You won !</div>
            <div className="restart">
              <button onClick={restart} className="restartButton">
                Play Again !
              </button>
            </div>
          </>
        )}

        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-up"></i>
            </div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-left"></i>
            </div>
            <div className={`key ${backward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <div className={`key ${rightward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-right"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
