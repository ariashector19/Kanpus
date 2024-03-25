import React, { useState } from "react";
import { FormNewUser } from "../formNewUser/FormNewUser";
import { Button } from "../button/Button";

export const DropdownComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Button onClick={handleDropdownClick}>Crear Cuenta</Button>
      {isDropdownOpen && (
        <FormNewUser
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      )}
    </div>
  );
};
