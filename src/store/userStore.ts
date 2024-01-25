import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Result } from "@/utils/calculate-result";

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
  acceptedTOS: boolean;
};

interface State {
  user: User;
  setUser: (user: User) => void;
  result: Result[] | undefined;
  setResult: (result: Result[] | undefined) => void;
}

const useUserStore = create<State>()(
  persist(
    (set) => ({
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
        acceptedTOS: false,
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
      result: [],
      setResult: (result) => set(() => ({ result })),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("UserStore", useUserStore);
}

export default useUserStore;
