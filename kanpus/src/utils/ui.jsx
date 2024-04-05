import { Link } from "react-router-dom";

const ui = {
  button:
    "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100 border-gray-400 \
  dark:border-gray-500 tracking-wide rounded enabled:hover:brightness-125 px-3 py-1 border shadow-lg disabled:text-gray-400 transition-all",
  primary: "!bg-cyan-300 dark:!bg-cyan-700",
  option:
    "mx-1 px-2 py-1 bg-transparent text-gray-600 dark:text-gray-300 \
  hover:text-black dark:hover:text-white rounded",
  active:
    "!text-black dark:!text-white !bg-gray-300 dark:!bg-gray-600 cursor-default",
  pending: "text-orange",
};

export default ui;

const withStyle =
  (Componente, ...clases) =>
  ({ className = "", ...props }) =>
    <Componente className={`${clases.join(" ")} ${className}`} {...props} />;

const button = (x) => <button {...x} />;
export const Button = withStyle(button, ui.button);
export const PrimaryButton = withStyle(button, ui.button, ui.primary);
export const OptionButton = withStyle(button, ui.option);
export const OptionLink = withStyle(Link, ui.option);

export const MenuBar = ({ left, rigth, secondary, children, ...props }) => (
  <div
    className={`sticky left-0 w-[100vw] px-6 py-2 flex flex-row gap-3 flex-wrap 
    justify-between items-baseline 
    ${
      secondary
        ? "bg-gray-200 dark:bg-gray-700"
        : "bg-gray-100 dark:bg-gray-800"
    }`}
    {...props}
  >
    <nav className="grow min-w-max flex flex-row flex-wrap gap-3 justify-evenly sm:justify-start items-baseline">
      {left}
    </nav>
    <nav className="grow flex flex-row flex-wrap gap-3 justify-evenly sm:justify-end items-baseline">
      {rigth}
    </nav>
  </div>
);

export const Card = ({ top, bottom, children, className, ...props }) => (
  <div
    className={`md:basis-80 md:grow-0 flex flex-col border 
    border-gray-600 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 ${
      className ?? ""
    }`}
    {...props}
  >
    <span className="p-3 bg-cyan-100 dark:bg-cyan-900 dark:text-white">
      {top}
    </span>
    <ul className="p-3 m-0 list-outside list-none flex-grow">{children}</ul>
    <span className="p-3">{bottom}</span>
  </div>
);

export const Item = ({ principal, options, ...props }) => (
  <li
    className="flex flex-col bg-gray-200 dark:bg-gray-700 border border-gray-300 
    dark:border-gray-600 pl-3 pt-3 mb-3"
    {...props}
  >
    <span className="pr-3">{principal}</span>
    <div className="text-right">{options}</div>
  </li>
);

export const Field = ({
  id,
  etiqueta,
  children,
  invalido = false,
  error = "",
}) => {
  return (
    <div className="mb-3">
      <div className="flex flex-row gap-3 align-top">
        <label
          htmlFor={id}
          className="grow text-gray-800 dark:text-gray-300 py-3"
        >
          {etiqueta}
        </label>
        {children}
      </div>
      {invalido && <p className="text-red-800 dark:text-red-300">{error}</p>}
    </div>
  );
};

export const FieldInput = ({
  id,
  etiqueta,
  invalido = false,
  error = "",
  onValueChange = () => {},
  ...props
}) => {
  return (
    <Field {...{ id, etiqueta, invalido, error }}>
      <input {...props} name={id} id={id} />
    </Field>
  );
};

export const FieldButton = ({ input, button, className }) => {
  const { className: inputClass, ...inputProps } = input;
  const { className: buttonClass, ...buttonProps } = button;

  return (
    <div className={`flex flex-row gap-0 w-full ${className ?? ""}`}>
      <input
        className={`focus:rounded-none focus:rounded-l-lg 
          outline-none border-dashed border-2 border-cyan-400 dark:border-cyan-600 focus:border-solid 
          text-center bg-transparent focus:text-left transition-all
          focus:bg-gray-50 dark:focus:bg-gray-700 grow min-w-[5rem] shadow-inner peer ${
            inputClass ?? ""
          }`}
        {...inputProps}
      />
      <Button
        className={`rounded-none rounded-r-lg hidden focus:inline active:inline peer-focus:inline ${
          buttonClass ?? ""
        }`}
        {...buttonProps}
      />
    </div>
  );
};
