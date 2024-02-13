import { configureStore } from "@reduxjs/toolkit";

import modalDialogReducer from "./features/modal/modalSlice";
import todoReducer from "./features/todo/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    modalDialog: modalDialogReducer,
  },
});

export default store;
