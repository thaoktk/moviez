import create from "zustand";

const useTvVideoStore = create((set) => ({
  tvVideo: {
    season_number: 1,
    episode_number: 1,
  },
  setTvVideo: (payload) => set((state) => ({ tvVideo: { ...payload } })),
}));

export default useTvVideoStore;
