import create from "zustand";

const useTypeSearch = create((set) => ({
  typeSearch: "movie",
  setTypeSearch: (payload) => set(() => ({ typeSearch: payload })),
}));

export default useTypeSearch;
