import React, { useContext, useState } from "react";
import { Input } from "../input/Input";
import "./formNewUser.css";
import { ThemeContext } from "../../utils/themeContext/Theme";

export const FormNewUser = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [bio, setBio] = useState("");
  const [plan, setPlan] = useState("g");
  const [checkBox, setCheckBox] = useState(false);

  const errores = {
    usuario: usuario.length < 3,
    email: email.match(/^[^@]+@[a-z0-9\-\.]+\.[a-z]{2,}$/i) === null,
    fechaNacimiento: Date.parse(fechaNacimiento) >= Date.now(),
    contrasena: contrasena.length < 8,
    checkBox: checkBox !== true,
  };
  const theme = useContext(ThemeContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: theme.bg, color: theme.text }}
    >
      <fieldset>
        <legend>Crear una cuenta</legend>
        <p>
          Con una cuenta de usuario podrás guardar tus tareas y consultarlas en
          cualquier dispositivo.
        </p>
        <Input
          id="usuario"
          type="text"
          placeholder="alice"
          value={usuario}
          onValueChange={setUsuario}
          invalido={errores.usuario}
          error="El nombre de usuario debe tener al menos 3 caracteres."
        >
          Nombre de usuario
        </Input>
        <Input
          id="email"
          type="email"
          placeholder="alice@example.org"
          value={email}
          onValueChange={setEmail}
          invalido={errores.email}
          error="Escribe una dirección de correo electrónico válida."
        >
          Correo electrónico
        </Input>
        <Input
          id="pass"
          type="password"
          value={contrasena}
          onValueChange={setContrasena}
          invalido={errores.contrasena}
          error="La contraseña debe tener al menos 8 caracteres."
        >
          Contraseña
        </Input>
        <Input
          id="fechaNacimiento"
          type="date"
          value={fechaNacimiento}
          onValueChange={setFechaNacimiento}
          invalido={errores.fechaNacimiento}
          error="La fecha de nacimiento no puede ser posterior al día actual."
        >
          Fecha de nacimiento
        </Input>

        <label htmlFor="bio">Biografía</label>
        <textarea
          id="bio"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />

        <label htmlFor="plan">Selecciona un plan</label>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          id="plan"
        >
          <option value="g">Gratuito (0€)</option>
          <option value="p">Pro (12€/año)</option>
        </select>

        <Input
          id="TerminosCondiciones"
          type="checkbox"
          value={checkBox}
          onValueChange={() => setCheckBox(!checkBox)}
          invalido={errores.checkBox}
          error="Debes Aceptar los términos y condiciones."
        >
          Terminos y Condiciones
        </Input>

        <p>
          <input
            type="submit"
            value="Crear cuenta"
            disabled={Object.values(errores).some((v) => v)}
          />
        </p>
      </fieldset>
    </form>
  );
};
