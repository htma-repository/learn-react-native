import { StateCreator } from "zustand";

export interface ICreateModalSlice {
  isModalShow: boolean;
  isModalShowHandler: () => void;
}

export const createModalSlice: StateCreator<
  ICreateModalSlice,
  [],
  [],
  ICreateModalSlice
> = (set) => ({
  isModalShow: false,
  isModalShowHandler: () =>
    set((state) => ({ isModalShow: !state.isModalShow })),
});
