import create from "zustand";

const useAuthStore = create((set) => ({
  currentUser: {},
  setCurrentUser: (payload) => set(() => ({ currentUser: payload })),
}));

export default useAuthStore;
