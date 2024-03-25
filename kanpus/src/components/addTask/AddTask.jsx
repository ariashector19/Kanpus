import { useState } from "react";
import "./addTask.css";
import { useDispatch } from "react-redux";
import { createdTask } from "../../slices/tasksSlice";

export const AddTask = ({ idList }) => {
  const [newTitle, setNewTitle] = useState("");
  const dispatch = useDispatch();
  // ...
  const hanldeSubmit = (event) => {
    event.preventDefault();
    console.log("Nueva tarea", newTitle, idList);
    dispatch(created(newTitle, idList));

    setNewTitle("");
  };
  return (
    <form onSubmit={hanldeSubmit} className="form">
      <input
        type="text"
        name="titulo"
        placeholder="Nueva tarea"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
    </form>
  );
};
