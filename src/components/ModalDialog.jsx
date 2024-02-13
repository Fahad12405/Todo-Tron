import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { closeModalDialog } from "../features/modal/modalSlice";
import { updateTodo } from "../features/todo/todoSlice";

export default function ModalDialog() {
  const inputNewTodoRef = useRef(null);
  const { todo } = useSelector((store) => store.modalDialog);
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState(todo?.todo || "");

  const variants = {
    hidden: {
      opacity: 0.5,
      scale: 0,
    },
    visible: {
      opacity: [1.2, 1],
      scale: 1,
    },
  };

  const handleSaveTodo = (event) => {
    event.preventDefault();

    if (todoValue.length < 3) {
      inputNewTodoRef.current.classList.add("animate-shaking");
      inputNewTodoRef.current.focus();

      setTimeout(() => {
        inputNewTodoRef.current.classList.remove("animate-shaking");
      }, 500);
      return;
    }

    dispatch(updateTodo({ id: todo.id, todo: todoValue }));
    dispatch(closeModalDialog());
  };

  return (
    <dialog className="absolute top-0 right-0 left-0 bottom-0 z-50 flex h-full w-full items-center justify-center bg-slate-800/80 backdrop-blur-[2px]">
      <motion.div
        className="flex h-max w-full flex-col gap-12  rounded-xl bg-slate-700/80 p-8 backdrop-blur-[2px] lg:max-w-sm"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          type: "spring",
        }}
      >
        <div className="border-b-[1px] border-slate-200 pb-1 text-left">
          <h1 className="90 text-xl font-semibold text-slate-100">Edit Todo</h1>
        </div>

        <form
          className="flex flex-col gap-8 text-left"
          onSubmit={handleSaveTodo}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-100/80">Todo text</h1>
            <input
              type="text"
              name={`todo-${todo.id}`}
              id={`todo-${todo.id}`}
              className="w-full rounded-md bg-slate-200 p-2 text-slate-900 focus:outline-none focus:ring-[2px] focus:ring-indigo-600"
              value={todoValue}
              ref={inputNewTodoRef}
              onChange={(event) => setTodoValue(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-grow items-center  gap-4 text-slate-900">
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              className="rounded-md bg-transparent py-2 px-4 text-slate-100 opacity-80 outline outline-1 outline-slate-200/60 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-slate-200/80"
              onClick={() => dispatch(closeModalDialog())}
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              type="submit"
              className="rounded-md bg-indigo-700 py-2 px-4 text-slate-200 outline-none  hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={todo?.todo === todoValue}
            >
              Save
            </motion.button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
}
