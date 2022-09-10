import create from "zustand";

const useFilmDetailStore = create((set) => ({
  film: {},
  setFilm: (payload) => set(() => ({ film: payload })),
}));

export default useFilmDetailStore;
