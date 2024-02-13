import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import {
  CategoryButton,
  EmptyTodo,
  FormInputTodo,
  ListTodos,
  ModalDialog,
} from "./components";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterTodosByCategoryValue = useMemo(() => {
    return searchParams.get("filter");
  }, [searchParams.get("filter")]);

  const {
    todo: { todos },
    modalDialog: { isOpen },
  } = useSelector((store) => store);

  const inputTodoRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryOnHover, setCategoryOnHover] = useState("null");
  const categories = ["All", "Active", "Completed"];

  useEffect(() => {
    if (searchParams.get("filter") === null) {
      setSearchParams({
        filter: "all",
      });
    }
  }, []);

  return (
    <main
      className={classNames(
        "mt-16 flex w-full flex-col items-center gap-8 px-12 pb-20 text-center sm:px-32 lg:px-44 xl:px-64 2xl:w-3/4 2xl:px-96",
        {
          "max-h-screen overflow-hidden lg:max-h-[80vh]": isOpen === true,
          "h-auto": isOpen === false,
        }
      )}
    >
      {isOpen && <ModalDialog />}
      <h1 className="text-xl font-bold text-slate-100 sm:text-3xl lg:text-4xl">
        What&apos;s the plan for today ?
      </h1>

      <section className="mt-4 w-full">
        <FormInputTodo inputTodoRef={inputTodoRef} />
      </section>

      <section
        className="flex items-center justify-center gap-4 lg:gap-8"
        onMouseLeave={() => setCategoryOnHover("null")}
      >
        <LayoutGroup id="badges-group">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              setSelectedCategory={setSelectedCategory}
              setCategoryOnHover={setCategoryOnHover}
              onHover={categoryOnHover === category}
              isActive={selectedCategory === category}
            >
              {category}
            </CategoryButton>
          ))}
        </LayoutGroup>
      </section>

      <section className="mt-16 flex w-full flex-col gap-5 py-2">
        {todos.length < 1 && <EmptyTodo inputTodoRef={inputTodoRef} />}
        <AnimatePresence mode="sync">
          {todos.length > 0 && (
            <ListTodos
              todos={todos}
              filterTodosByCategoryValue={filterTodosByCategoryValue}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default App;
