import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type User = {
  name: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  revenue: string;
  desiredRevenue: string;
  marketingConsent: boolean;
  isFreelancer: boolean;
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
    revenue: "",
    desiredRevenue: "",
    marketingConsent: false,
    isFreelancer: false,
  },
  setUser: (user) =>
    set((prev) => {
      return {
        user: {
          ...prev.user,
          ...user,
        },
      };
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("UserStore", useUserStore);
}

export default useUserStore;
