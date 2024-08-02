import { CategorieState, ICategory } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CategorieState = {
  categories: [],
  open: false,
};

const categorieslice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
    setAllcategories: (state, action: PayloadAction<ICategory[]>) => {
      console.log(action.payload);
      state.categories = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal, setAllcategories } = categorieslice.actions;

export default categorieslice.reducer;
