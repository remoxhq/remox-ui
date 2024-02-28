import { create } from "zustand";

interface IProps {
  role: string | undefined;
  address: string | undefined;
  setRole: (by: string | undefined) => void;
  setAddress: (by: string | undefined) => void;
}
export const useUserInfo = create<IProps>((set) => ({
  role: undefined,
  address: undefined,
  setRole: (by) => set({ role: by }),
  setAddress: (by) => set({ address: by }),
}));
