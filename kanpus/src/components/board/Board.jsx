import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "../taskList/TaskList";
import { Button } from "../button/Button";
import { createdList, loadBoard } from "../../slices/boardSlice";
import "./board.css";
import { loadedTasks } from "../../slices/tasksSlice";

export const Board = () => {
  const [newList, setNewList] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoard()).then(() => dispatch(loadedTasks()));
  }, []);
  const { status, lists } = useSelector((state) => state.board);
  const createList = (event) => {
    event.preventDefault();
    dispatch(createdList(newList));
    setNewList("");
  };

  if (status == "LOADING") return <p>Cargando tablero...</p>;
  if (status == "FAILED") return <p>Error al cargar el tablero.</p>;
  return (
    <div className="tablero">
      {Object.keys(lists).map((id) => (
        <TaskList key={id} id={id} />
      ))}
      <div className="lista">
        <form onSubmit={createList}>
          <input
            type="text"
            placeholder="Nueva lista"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
          />
          <p>
            <Button type="submit">Crear lista</Button>
          </p>
        </form>
      </div>
    </div>
  );
};
