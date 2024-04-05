import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  taskMovedRight,
  taskMovedLeft,
  useGetListsQuery,
} from "../../../../slices/apiSlice";
import { Button } from "../../../../utils/ui";
import TaskList from "../taskList/TaskList";

const PanelList = () => {
  const { id } = useLoaderData();
  const {
    data: lists,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetListsQuery(id);
  const dispatch = useDispatch();

  const moveTask = (idList) => (taskId, forward) => () =>
    dispatch(
      (forward ? taskMovedRight : taskMovedLeft)({ id, idList, taskId })
    );

  return (
    <div
      className={`p-6 flex flex-col md:flex-row nowrap gap-3 align-stretch md:min-w-min ${
        isFetching ? "animate-pulse" : ""
      }`}
    >
      {isSuccess && (
        <>
          {lists.map((val) => (
            <TaskList
              key={val.id}
              id={val.id}
              name={val.name}
              onMovingTask={moveTask(val.id)}
            />
          ))}
        </>
      )}
      {isLoading && <p>Cargando tu tablero...</p>}
      {isError && (
        <p>
          Ocurrió un error al cargar el tablero: {error.error}
          <Button onClick={refetch}>¿Intentar de nuevo?</Button>
        </p>
      )}
    </div>
  );
};

export default PanelList;
