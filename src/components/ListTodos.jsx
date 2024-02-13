import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { openModalDialog } from "../features/modal/modalSlice";
import { removeTodo, updateTodoCompleted } from "../features/todo/todoSlice";

function TodoItem({ todo, id, index, isCompleted }) {
  const dispatch = useDispatch();
  const [todoIsCompleted, setTodoIsCompleted] = useState(isCompleted);

  const itemsVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        delay: i * 0.5,
      },
    }),
    hidden: {
      opacity: 0,
      y: 32,
      transition: {
        type: "spring",
      },
    },
  };

  const handleUpdateTodoIsCompleted = () => {
    setTodoIsCompleted(!todoIsCompleted);
    dispatch(updateTodoCompleted(id));
  };

  return (
    <motion.li
      className="group flex items-center justify-between rounded-lg border-[1px] border-slate-400/20 p-4 text-left text-slate-100/90 shadow-inner backdrop-blur-sm"
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      custom={index / 9}
      variants={itemsVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div className="flex items-center gap-3">
        <motion.input
          type="checkbox"
          checked={todoIsCompleted}
          onChange={handleUpdateTodoIsCompleted}
          name={`${id}-complete`}
          id={`${id}-complete`}
          className="cursor-pointer accent-indigo-600 focus:outline-none focus:outline-1 focus:outline-indigo-600/50"
          whileHover={{
            boxShadow: "2px 2px 20px #4f46e5",
          }}
        />
        <p
          className={classNames({
            "text-slate-200/50 line-through": isCompleted === true,
            "text-slate-100/90 no-underline": isCompleted === false,
          })}
        >
          {todo}
        </p>
      </div>
      <div className="hidden items-center gap-4 text-slate-300/50 group-hover:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-6 w-6 cursor-pointer hover:text-slate-300/80"
          onClick={() => dispatch(openModalDialog({ todo, id }))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer hover:text-slate-300/80"
          onClick={() => dispatch(removeTodo(id))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </motion.li>
  );
}

export default function ListTodos({
  todos,
  filterTodosByCategoryValue = "all",
}) {
  return todos.map((todo, index) => {
    if (filterTodosByCategoryValue === "completed") {
      return (
        todo.isCompleted && <TodoItem {...todo} index={index} key={todo.id} />
      );
    }

    if (filterTodosByCategoryValue === "active") {
      return (
        todo.isCompleted !== true && (
          <TodoItem {...todo} index={index} key={todo.id} />
        )
      );
    }

    return <TodoItem {...todo} index={index} key={todo.id} />;
  });
}

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
ListTodos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
  filterTodosByCategoryValue: PropTypes.string.isRequired,
};
