export const MenuBar = ({ left, right, secundary, children, ...props }) => (
  <div
    className={`sticky left-0 w-[100vw] px-6 py-2 flex flex-row gap-3 flex-wrap
      justify-between items-baseline
      ${
        secundary
          ? "bg-gray-200 dark:bg-gray-700"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
    {...props}
  >
    <div className="grow min-w-max">{left}</div>
    <div className="grow flex flex-row flex-wrap gap-3 justify-evenly sm:justify-end items-baseline">
      {right}
    </div>
  </div>
);
