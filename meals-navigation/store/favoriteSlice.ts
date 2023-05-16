import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IFavorite } from "../types/types";
import Meal from "../models/meal";

const initialState: IFavorite = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Meal>) => {
      state.favorite = state.favorite.concat(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Meal>) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
