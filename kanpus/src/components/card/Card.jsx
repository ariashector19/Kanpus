export const Card = ({ top, bottom, children, className, ...props }) => (
  <div
    className={`md:basis-80 md:grow-0 flex flex-col border
      border-gray-600 rounded overflow-hidden bg-gray-100 dark:bg-gray-800
      ${className ?? ""}`}
    {...props}
  >
    <span className="p-3 bg-cyan-100 dark:bg-cyan-900 dark:text-white">
      {top}
    </span>
    <ul className="p-3 m-0 list-outside list-none flex-grow">{children}</ul>
    <span className="p-3">{bottom}</span>
  </div>
);
