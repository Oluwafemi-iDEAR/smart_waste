import { create } from "zustand";

const useStore = create((set) => ({
  user: {},
  setUser: (userData) => set({ user: userData }),
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

export default useStore;
