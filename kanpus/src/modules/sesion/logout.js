import { redirect } from "react-router-dom";
import Sesion from "./api";
import { store } from "../../app/store";
import { logout } from "../../slices/authSlice";

export const loader = async () => {
  await Sesion.logout();
  store.dispatch(logout());
  return redirect("/");
};
