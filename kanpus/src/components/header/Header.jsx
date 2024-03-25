import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const tasks = useSelector((state) => Object.values(state.tasks.list));

  const countingUndoneTasks = (tasks) => {
    return tasks.filter((task) => !task.completed).length;
  };

  let pending = countingUndoneTasks(tasks);

  const plural = (number, messageTrue, messageFalse) =>
    number > 1 ? messageTrue : messageFalse;

  return (
    <div>
      {tasks.length > 0 ? (
        <p>
          {plural(
            tasks.length,
            `${tasks.length} tareas, ${pending} ${plural(
              pending,
              "pendientes",
              "pendiente"
            )} `,
            `${tasks.length} tarea  ${pending} pendiente`
          )}
        </p>
      ) : (
        <p>¡Enhorabuena! No te quedan tasks</p>
      )}
    </div>
  );
};
