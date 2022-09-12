import create from "zustand";

const useSearchStore = create((set) => ({
  querySearch: "",
  typeSearch: "movie",
  setQuerySearch: (payload) => set(() => ({ querySearch: payload })),
  setTypeSearch: (payload) => set(() => ({ typeSearch: payload })),
}));

export default useSearchStore;
