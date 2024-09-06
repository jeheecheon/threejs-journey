import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

function Interface() {
  const time = useRef<HTMLDivElement>(null!);
  const restartButton = useRef<HTMLDivElement>(null!);

  const restart = useGame((state) => state.restart);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
        restartButton.current.style.display = "flex";
      } else {
        restartButton.current.style.display = "none";
      }

      elapsedTime /= 1000;
      elapsedTime = +elapsedTime.toFixed(2);
      const displayTime = elapsedTime
        .toString()
        .split(".")
        .map((n, i) => {
          if (i === 1) return n.padEnd(2, "0");
          return n;
        })
        .join(".");

      if (time.current) time.current.textContent = displayTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart */}
      <div ref={restartButton} className="restart" onClick={restart}>
        Restart
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : " "}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : " "}`}></div>
          <div className={`key ${backward ? "active" : " "}`}></div>
          <div className={`key ${rightward ? "active" : " "}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : " "}`}></div>
        </div>
      </div>
    </div>
  );
}

export default Interface;
