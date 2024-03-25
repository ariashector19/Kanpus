export const Item = ({ main, options, ...props }) => (
  <li
    className="flex flex-col bg-gray-200 dark:bg-gray-700 border border-gray-300
      dark:border-gray-600 pl-3 pt-3 mb-3"
    {...props}
  >
    <span className="pr-3">{main}</span>
    <div className="text-right">{options}</div>
  </li>
);
