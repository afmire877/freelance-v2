import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  borough:
    | "Hackney"
    | "Newham"
    | "Redbridge"
    | "Tower Hamlets"
    | "Waltham Forest";
};

interface State {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<State>()((set) => ({
  user: {
    name: "",
    borough: "Hackney",
    contactNumber: "",
    email: "",
    dateOfBirth: "",
  },
  setUser: (user) => set({ user }),
}));

export default useUserStore;
