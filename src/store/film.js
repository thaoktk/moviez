import create from "zustand";

const useFilmDetailStore = create((set) => ({
  film: {},
  tvVideo: {
    season_number: 1,
    episode_number: 1,
  },
  setFilm: (payload) => set(() => ({ film: payload })),
  setTvVideo: (payload) => set((state) => ({ tvVideo: { ...payload } })),
}));

export default useFilmDetailStore;
