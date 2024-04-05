import { useGetTaskListQuery } from "../../../../slices/apiSlice";
import { Card } from "../../../../utils/ui";
import { AddTask } from "../../../../components/addTask/AddTask";
import Task from "../../../../components/task/Task";

const TaskList = ({ id: listId, name, onMovingTask }) => {
  const {
    data: tasks,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetTaskListQuery(listId);

  return (
    <Card
      top={
        <span className="font-bold text-gray-700 dark:text-gray-300">
          {name}
        </span>
      }
      bottom={<AddTask listId={listId} />}
      className={isFetching ? "animate-pulse" : ""}
    >
      {isSuccess &&
        tasks.length > 0 &&
        tasks.map((t) => (
          <Task
            key={t.id}
            id={t.id}
            title={t.title}
            onMovingLeft={onMovingTask(t.id, false)}
            onMovingRight={onMovingTask(t.id, true)}
          />
        ))}
      {isLoading && <p>Cargando tasks...</p>}
      {isError && <p>Ocurrió un error al cargar tasks: {error.error}</p>}
    </Card>
  );
};

export default TaskList;
