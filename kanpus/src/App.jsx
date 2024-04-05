import ui from "./utils/ui";
import { MenuBar } from "./utils/ui";
import {
  NavLink,
  Outlet,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";

const App = () => {
  const navigation = useNavigation();
  const user = useRouteLoaderData("sesion")?.user;

  return (
    <>
      <MenuBar
        left={
          <>
            <span>Kanpus</span>
            {user && (
              <NavLink
                to="/boards"
                end
                className={({ isActive, isPending }) =>
                  `${ui.option} ${
                    isActive ? ui.active : isPending ? ui.pending : ""
                  }`
                }
              >
                Mis boards
              </NavLink>
            )}
          </>
        }
        right={
          user ? (
            <NavLink to="/account/logout" className={ui.option}>
              Cerrar sesión
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/account/login"
                className={({ isActive, isPending }) =>
                  `${ui.option} ${
                    isActive ? ui.active : isPending ? ui.pending : ""
                  }`
                }
              >
                Iniciar sesión
              </NavLink>
              <NavLink
                to="/account/register"
                className={({ isActive, isPending }) =>
                  `${ui.option} ${
                    isActive ? ui.active : isPending ? ui.pending : ""
                  }`
                }
              >
                Crear nueva account
              </NavLink>
            </>
          )
        }
      />
      <div
        className={
          navigation.state !== "idle" ? "animate-pulse saturate-50" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
};

export default App;
