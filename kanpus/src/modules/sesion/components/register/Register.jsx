import { Form, json, Link, redirect, useActionData } from "react-router-dom";
import { useInput } from "../../../../utils/hooks";
import Sesion from "../../api";
import { PrimaryButton, Field, FieldInput, Card } from "../../../../utils/ui";

export const action = async ({ request }) => {
  const data = await request.formData();
  const success = await Sesion.signup(
    data.get("user"),
    data.get("password"),
    data.get("email")
  );
  if (success) {
    const logged = await Sesion.login(data.get("user"), data.get("password"));
    if (logged) {
      return redirect("/boards");
    }
  }
  return json({ failedLoging: true });
};

const Register = () => {
  const failedLoging = useActionData()?.failedLoging;
  const [user, setUsuario] = useInput("");
  const [email, setEmail] = useInput("");
  const [bornDate, setBornDate] = useInput("");
  const [password, setPassword] = useInput("");
  const [bio, setBio] = useInput("");
  const [plan, setPlan] = useInput("g");

  const errors = {
    user: user.length > 0 && user.length < 3,
    email:
      email.length > 0 &&
      email.match(/^[^@]+@[a-z0-9\-\.]+\.[a-z]{2,}$/i) === null,
    bornDate: Date.parse(bornDate) >= Date.now(),
    password: password.length > 0 && password.length < 8,
  };

  return (
    <Form method="post">
      <fieldset>
        <Card
          top="Crear una nueva cuenta"
          bottom={
            <>
              <PrimaryButton
                type="submit"
                disabled={Object.values(errors).some((v) => v)}
                className="w-full"
              >
                Crear cuenta
              </PrimaryButton>
              {failedLoging && (
                <p className="text-center text-red-500 pt-3">
                  No se pudo registrar la cuenta debido a un error.
                </p>
              )}
              <p className="pt-3 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="../acceder"
                  className="text-cyan-800 dark:text-cyan-300"
                >
                  Inicia sesión
                </Link>
              </p>
            </>
          }
        >
          <FieldInput
            id="user"
            type="text"
            placeholder="alice"
            value={user}
            onChange={setUsuario}
            invalido={errors.user}
            error="El nombre de user debe tener al menos 3 caracteres."
            etiqueta="Nombre de user"
            required
          />
          <FieldInput
            id="email"
            type="email"
            placeholder="alice@example.org"
            value={email}
            onChange={setEmail}
            invalido={errors.email}
            error="Escribe una dirección de correo electrónico válida."
            required
            etiqueta="Correo electrónico"
          />
          <FieldInput
            id="password"
            type="passwordword"
            value={password}
            onChange={setPassword}
            invalido={errors.password}
            error="La contraseña debe tener al menos 8 caracteres."
            required
            autoComplete="new-passwordword"
            etiqueta="Contraseña"
          />
          <FieldInput
            id="bornDate"
            type="date"
            value={bornDate}
            onChange={setBornDate}
            invalido={errors.bornDate}
            error="La fecha de nacimiento no puede ser posterior al día actual."
            etiqueta="Fecha de nacimiento"
          />
          <Field id="bio" etiqueta="Biografia">
            <textarea id="bio" name="bio" onChange={setBio} value={bio} />
          </Field>
          <Field id="plan" etiqueta="Selecciona un plan">
            <select value={plan} onChange={setPlan} id="plan">
              <option value="g">Gratuito (0€)</option>
              <option value="p">Pro (12€/año)</option>
            </select>
          </Field>

          {plan == "p" && (
            <>
              <FieldInput
                id="tarjeta"
                maxLength="16"
                placeholder="1234 5678 1234 5678"
                etiqueta="Número de tarjeta"
              />
              <FieldInput
                id="caducidad"
                maxLength="6"
                placeholder="MMYYYY"
                etiqueta="Fecha de caducidad"
              />
              <FieldInput
                id="cvv"
                maxLength="3"
                placeholder="123"
                etiqueta="CVV"
              />
            </>
          )}
        </Card>
        <p></p>
      </fieldset>
    </Form>
  );
};

export default Register;
