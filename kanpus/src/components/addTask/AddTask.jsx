import { useState } from "react";
import "./addTask.css";
import { useDispatch } from "react-redux";
import { useCreateTaskMutation } from "../../slices/apiSlice";

export const AddTask = ({ listId }) => {
  const [newTitle, setNewTitle] = useState("");
  const [createTask, result] = useCreateTaskMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask({ title: newTitle, list: listId });
    setNewTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldutton
        input={{
          type: "text",
          name: "title",
          placeholder: "Nueva tarea",
          onChange: (event) => setNewTitle(event.target.value),
          value: newTitle,
        }}
        boton={{ type: "submit", children: "Crear" }}
      />
    </form>
  );
};
