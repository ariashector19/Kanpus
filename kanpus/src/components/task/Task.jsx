import { useState } from "react";
import { Item, OptionButton } from "../../utils/ui";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../slices/apiSlice";
import { useEffect } from "react";

const Task = ({ id, title: initialTitle, onMovingLeft, onMovingRight }) => {
  const [title, setTitle] = useState(initialTitle);
  const [renameTask, result] = useUpdateTaskMutation();
  const [deleteTask, result2] = useDeleteTaskMutation();

  useEffect(() => {
    const renamePetition = renameTask({ id, title });
    return () => {
      renamePetition?.abort();
    };
  }, [title]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Item
      principal={title}
      opciones={
        <>
          <OptionButton onClick={onMovingLeft}>&lt;</OptionButton>
          <OptionButton onClick={onMovingRight}>&gt;</OptionButton>
          <OptionButton onClick={() => deleteTask(id)}>×</OptionButton>
        </>
      }
    >
      <input type="text" value={title} onChange={handleChange} />
    </Item>
  );
};

export default Task;
