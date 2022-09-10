import create from "zustand";

const useQuerySearchStore = create((set) => ({
  querySearch: "",
  setQuerySearch: (payload) => set(() => ({ querySearch: payload })),
}));

export default useQuerySearchStore;
