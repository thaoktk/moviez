import create from "zustand";

const useActiveGenresStore = create((set) => ({
  activeGenres: [],
  setActiveGenres: (payload) => set(() => ({ activeGenres: [...payload] })),
}));

export default useActiveGenresStore;
