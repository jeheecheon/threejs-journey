import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GameStore {
  blocksCount: number;
  phase: "ready" | "playing" | "ended";
  startTime: number;
  blocksSeed: number;
  endTime: number;
  start: () => void;
  restart: () => void;
  end: () => void;
}

const useGame = create<GameStore>()(
  subscribeWithSelector((set) => ({
    blocksCount: 5,
    blocksSeed: 0,

    phase: "ready",

    startTime: 0,
    endTime: 0,

    start: () => {
      set((state) => {
        if (state.phase === "ready")
          return {
            phase: "playing",
            startTime: Date.now(),
          };

        return {};
      });
    },

    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended")
          return {
            phase: "ready",
            endTime: Date.now(),
            blocksSeed: Math.random(),
          };

        return {
          phase: "ready",
        };
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing")
          return { phase: "ended", endTime: Date.now() };

        return {};
      });
    },
  }))
);

export default useGame;
