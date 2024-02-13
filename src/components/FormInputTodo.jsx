import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { addTodo } from "../features/todo/todoSlice";

export default function FormInputTodo({ inputTodoRef }) {
  const dispatch = useDispatch();
  const [newTodoValue, setNewTodoValue] = useState("");

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    if (newTodoValue.length < 3) {
      inputTodoRef.current.classList.add("animate-shaking");
      inputTodoRef.current.focus();

      setTimeout(() => {
        inputTodoRef.current.classList.remove("animate-shaking");
      }, 500);
      return;
    }

    const payload = {
      id: Date.now(),
      isCompleted: false,
      todo: newTodoValue,
    };

    dispatch(addTodo(payload));
    setNewTodoValue("");
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-around gap-6 py-4 md:flex-row"
      onSubmit={handleAddNewTodo}
    >
      <input
        type="text"
        ref={inputTodoRef}
        className="w-full appearance-none rounded-md bg-slate-800/20 py-3 px-4 text-slate-100 ring-1 ring-slate-300/10 backdrop-blur-md placeholder:text-sm placeholder:text-slate-400/80 focus:outline-none focus:ring-1 focus:ring-slate-300/40"
        name="add-todo"
        id="add-todo"
        placeholder="What to do ?"
        autoComplete="off"
        value={newTodoValue}
        onChange={(event) => setNewTodoValue(event.target.value)}
      />
      <motion.button
        type="submit"
        className="w-1/2 rounded-lg bg-slate-700/80 py-3 px-4 text-slate-100/90 shadow-2xl ring-1 ring-slate-900/10 backdrop-blur-sm hover:ring-slate-300/20 focus:outline-none focus:ring-1 focus:ring-slate-300/40 lg:w-1/3 lg:px-4"
        whileTap={{
          scale: 0.925,
          transition: {
            duration: 0.15,
          },
        }}
      >
        Add
      </motion.button>
    </form>
  );
}

FormInputTodo.propTypes = {
  inputTodoRef: PropTypes.objectOf(PropTypes.instanceOf(HTMLInputElement))
    .isRequired,
};
