import { Button } from "../button/Button";

export const InputButton = ({ input, button, className }) => {
  const { className: inputClass, ...inputProps } = input;
  const { className: buttonClass, ...buttonProps } = button;

  return (
    <div className={`flex flex-row gap-0 w-full ${className ?? ""}`}>
      <input
        className={`grow focus:rounded-none focus:rounded-l-lg outline-none
            border-dashed border-2 border-cyan-400 dark:border-cyan-600 focus:border-solid
            text-center bg-transparent focus:text-left transition-all
            focus:bg-gray-50 dark:focus:bg-gray-700 grow min-w-[5rem] peer ${
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
