import create from "zustand";

const useCommonStore = create((set) => ({
  isLoading: false,
  isError: false,
  path: "/",
  setIsLoading: (payload) => set(() => ({ isLoading: payload })),
  setIsError: (payload) => set(() => ({ isError: payload })),
  setPath: (payload) => set(() => ({ path: payload })),
}));

export default useCommonStore;
