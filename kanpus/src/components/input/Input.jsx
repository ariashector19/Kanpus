import React from "react";

export const Input = ({
  id,
  children,
  invalido = false,
  error = "",
  onValueChange = () => {},
  ...props
}) => {
  return (
    <div className="campo">
      <label htmlFor={id}>{children}</label>
      <input
        {...props}
        name={id}
        id={id}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {invalido && <p className="error">{error}</p>}
    </div>
  );
};
