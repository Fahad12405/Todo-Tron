import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  todo: {},
};

const modalDialogSlice = createSlice({
  name: "modalDialog",
  initialState,
  reducers: {
    openModalDialog: (state, actions) => {
      state.isOpen = true;
      state.todo = actions.payload;
    },
    closeModalDialog: (state) => {
      state.isOpen = false;
      state.todo = {};
    },
  },
});

const modalDialogReducer = modalDialogSlice.reducer;

export const { openModalDialog, closeModalDialog } = modalDialogSlice.actions;

export default modalDialogReducer;
