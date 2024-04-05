import { Outlet, redirect } from "react-router-dom";
import Sesion from "../../api";

export const loader = (params) => {
  const user = Sesion.getUser();

  if (user) {
    return { user };
  } else {
    return redirect("/account/login");
  }
};

export const ProtectedPage = () => <Outlet />;
