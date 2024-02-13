import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CategoryButton({
  children,
  setSelectedCategory,
  setCategoryOnHover,
  isActive,
  onHover,
}) {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSelectedCategory(children);
    setSearchParams({
      filter: children.toLowerCase(),
    });
  };
  return (
    <button
      type="button"
      className="relative flex flex-col items-center rounded-lg ring-indigo-700 focus:outline-none focus:ring-2"
      onClick={handleClick}
      onMouseEnter={() => setCategoryOnHover(children)}
    >
      <div
        className={classNames(
          "rounded-lg px-4 text-slate-200 outline outline-1 outline-indigo-700/80 ",
          {
            "bg-transparent": !isActive,
            "bg-indigo-700/80": isActive,
          }
        )}
      >
        {children}
      </div>
      {onHover && (
        <motion.div
          className="absolute bottom-0 top-0 left-0 right-0 rounded-lg bg-indigo-700/30"
          layoutId="onHover"
        />
      )}
      {isActive && (
        <motion.div
          className="absolute -bottom-2 m-auto h-[2px]  w-1/2 rounded-2xl bg-indigo-600"
          layoutId="isActive"
        />
      )}
    </button>
  );
}

CategoryButton.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onHover: PropTypes.bool.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setCategoryOnHover: PropTypes.func.isRequired,
};
