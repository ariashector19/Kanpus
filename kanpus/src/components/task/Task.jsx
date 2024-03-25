import { Button } from "../button/Button";
import { useSelector, useDispatch } from "react-redux";

import "./task.css";
//import { taskMovedToLeft, taskMovedToRight } from "../../slices/boardSlice";

export const Task = ({ id }) => {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.tasks.list[id]);
  const deleteTask = () => console.log("Borrando tarea", id);
  // const alternateTask = () => dispatch(alternated(id));
  const duplicateTask = () => console.log("Duplicando tarea", id);
  const editTask = (event) => {
    console.log("Editando tarea", id, event.target.value);
  };

  return (
    <li>
      <input type="text" value={title} onChange={editTask} />
      {/* <Button onClick={() => dispatch(taskMovedToLeft(id))}>&lt;</Button>
      <Button onClick={() => dispatch(taskMovedToRight(id))}>&gt;</Button> */}
      <Button onClick={deleteTask}>×</Button>
      <Button onClick={duplicateTask}>D</Button>
    </li>
  );
};

const Tarea = ({ id }) => {
  const { titulo } = useSelector((state) => state.tareas.lista[id]);
  const dispatch = useDispatch();
  const eliminarTarea = () => dispatch(eliminada(id));
  const editarTarea = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }));
  };
  const duplicarTarea = () => dispatch(tareaDuplicada(id));

  return (
    <li>
      <input type="text" value={titulo} onChange={editarTarea} />
      <Boton onClick={duplicarTarea}>D</Boton>
      <Boton onClick={eliminarTarea}>×</Boton>
    </li>
  );
};
