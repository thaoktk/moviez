import create from "zustand";

const useAuth = create((set) => ({
  currentUser: {},
  setCurrentUser: (payload) => set(() => ({ currentUser: payload })),
}));

export default useAuth;
