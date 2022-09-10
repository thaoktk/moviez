import create from "zustand";

const useTypeSearchStore = create((set) => ({
  typeSearch: "movie",
  setTypeSearch: (payload) => set(() => ({ typeSearch: payload })),
}));

export default useTypeSearchStore;
