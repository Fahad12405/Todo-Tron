import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: intialState,
  reducers: {
    addTodo: (state, actions) => {
      state.todos = [...state.todos, actions.payload];
    },
    removeTodo: (state, actions) => {
      state.todos = state.todos.filter((todo) => todo.id !== actions.payload);
    },
    updateTodo: (state, actions) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === actions.payload.id) {
          todo.todo = actions.payload.todo;
        }

        return todo;
      });
    },
    updateTodoCompleted: (state, actions) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === actions.payload) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    },
  },
});

const todoReducer = todoSlice.reducer;

export const { removeTodo, addTodo, updateTodoCompleted, updateTodo } =
  todoSlice.actions;
export default todoReducer;
