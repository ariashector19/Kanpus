import { PrimaryButton, FieldInput, Card } from "../../utils/ui";
import { useInput } from "../../utils/hooks";
import Sesion from "./api";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { store } from "../../app/store";
import { logged } from "../../slices/authSlice";

export const action = async ({ request }) => {
  const data = await request.formData();
  // Comprobar el user y la contraseña
  const result = await Sesion.login(
    data.get("userLogin"),
    data.get("passLogin")
  );

  if (result) {
    store.dispatch(logged(result));
    return redirect("/boards");
  } else {
    return { failedLogin: true };
  }
};

export const Login = () => {
  const failedLogin = useActionData()?.failedLogin;
  const [user, setUser] = useInput("");
  const [password, setPassword] = useInput("");

  return (
    <Form method="post">
      <fieldset>
        <Card
          top="Ya tengo una cuenta"
          bottom={
            <>
              <PrimaryButton type="submit" className="w-full">
                Iniciar sesión
              </PrimaryButton>
              {failedLogin && (
                <p className="text-center text-red-500 pt-3">
                  El user o la contraseña son incorrectos.
                </p>
              )}
              <p className="pt-3 text-center">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="../register"
                  className="text-cyan-800 dark:text-cyan-300"
                >
                  Crea una nueva
                </Link>
              </p>
            </>
          }
        >
          <FieldInput
            id="userLogin"
            type="text"
            placeholder="alice"
            required
            value={user}
            onChange={setUser}
            etiqueta="Nombre de user"
          />
          <FieldInput
            id="passLogin"
            type="password"
            required
            value={password}
            onChange={setPassword}
            etiqueta="Contraseña"
          />
        </Card>
      </fieldset>
    </Form>
  );
};
