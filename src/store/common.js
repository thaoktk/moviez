import create from "zustand";

const useCommonStore = create((set) => ({
  isLoading: false,
  isError: false,
  setIsLoading: (payload) => set(() => ({ isLoading: payload })),
  setIsError: (payload) => set(() => ({ isError: payload })),
}));

export default useCommonStore;
