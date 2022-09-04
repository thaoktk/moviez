import create from "zustand";

const useFilmDetail = create((set) => ({
  film: {},
  setFilm: (payload) => set(() => ({ film: payload })),
}));

export default useFilmDetail;
