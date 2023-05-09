import { create } from "zustand";

import { createModalSlice, ICreateModalSlice } from "./modalSlice";

export const useStore = create<ICreateModalSlice>((...a) => ({
  ...createModalSlice(...a),
}));
