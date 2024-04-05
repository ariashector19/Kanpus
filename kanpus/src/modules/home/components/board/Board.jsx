import { MenuBar, OptionLink } from "../../../../utils/ui";
import {
  useDeleteBoardMutation,
  useGetListsQuery,
  useGetBoardsQuery,
  useGetTasksQuery,
} from "../../../../slices/apiSlice";
import {
  Outlet,
  useLoaderData,
  useMatch,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { Button } from "../../../../utils/ui";

export const loader = async ({ params }) => {
  const id = params.tableroId;
  return { id };
};

const Header = () => {
  const { user } = useRouteLoaderData("sesion");
  const { id } = useLoaderData();
  const match = useMatch({ path: "boards/:id/edit", end: false });
  const { lists, ids, listsOk } = useGetListsQuery(id, {
    // Es importante usar el operador de acceso "?." en este caso
    // porque si los datos aún no están cargados provocará un error
    selectFromResult: ({ data, isSuccess }) => ({
      lists: data?.length,
      ids: data?.map((l) => l.id) || [],
      listsOk: isSuccess,
    }),
  });
  const { tasks, tasksOk } = useGetTasksQuery(undefined, {
    selectFromResult: ({ data, isSuccess }) => ({
      tasks: data?.filter((t) => ids.includes(t.list))?.length,
      tasksOk: isSuccess,
    }),
  });
  const { name, nameOk } = useGetBoardsQuery(user, {
    selectFromResult: ({ data, isSuccess }) => ({
      name: data?.find((t) => t.id === id)?.name,
      nameOk: isSuccess,
    }),
  });

  const [endPointDeleteBoard, _] = useDeleteBoardMutation();

  const navigate = useNavigate();
  const deleteBoard = () => {
    endPointDeleteBoard(id).then(() => {
      navigate("/boards");
    });
  };

  return (
    <MenuBar
      secundary
      left={
        <>
          <strong>{nameOk ? name : "Cargando..."}</strong> ·{" "}
          {listsOk && <>{lists} lists</>} · {tasksOk && <>{tasks} tasks</>}
        </>
      }
      right={
        <>
          {match ? (
            <OptionLink to={`/boards/${id}`}>Volver al tablero</OptionLink>
          ) : (
            <OptionLink to="edit">Editar lists</OptionLink>
          )}
          <Button onClick={deleteBoard}>Eliminar tablero</Button>
        </>
      }
    />
  );
};

const Board = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Board;
