import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Board, {
  loader as boardLoader,
} from "./modules/home/components/board/Board";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Register, {
  action as registerAction,
} from "./modules/sesion/components/register/Register";
import MyBoards from "./modules/home/components/board/MyBoards";
import EditLists from "./modules/home/components/editList/EditList";
import PanelList from "./modules/home/components/panelList/PanelList";
import {
  ProtectedPage,
  loader as sesionLoader,
} from "./modules/sesion/components/protectedPage/ProtectedPage";
import { loader as logoutLoader } from "./modules/sesion/logout";
import { Login, action as loginAction } from "./modules/sesion/Login";
import LandingPage from "./modules/sesion/components/landingPage/LadingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="account" />} />
      <Route path="account" element={<LandingPage />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} action={loginAction} />
        <Route path="register" element={<Register />} action={registerAction} />
        <Route path="logout" loader={logoutLoader} />
      </Route>
      <Route element={<ProtectedPage />} loader={sesionLoader} id="sesion">
        <Route path="boards" element={<MyBoards />} />
        <Route path="boards/:boardId" element={<Board />} loader={boardLoader}>
          <Route index element={<PanelList />} loader={boardLoader} />
          <Route path="edit" element={<EditLists />} loader={boardLoader} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
