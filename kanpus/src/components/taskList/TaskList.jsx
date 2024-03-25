import { useContext } from "react";
import { Task } from "../task/Task";
import { AddTask } from "../addTask/AddTask";
import "./taskList.css";
import { ThemeContext } from "../../utils/themeContext/Theme";
import { useSelector, useDispatch } from "react-redux";
//import { deleteList, modifiedBoard } from "../../slices/boardSlice";
import { Button } from "../button/Button";

export const TaskList = ({ id: idList }) => {
  const { name, list: tasks } = useSelector(
    (state) => state.board.lists[listId] ?? { name: "", list: [] }
  );
  const status = useSelector((state) => state.tasks.status);
  //const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  console.log("List", tasks);
  console.log("name", name);

  const theme = useContext(ThemeContext);

  const handleChange = (event) => {
    console.log("Cambiando nombre", event.target.value);
    dispatch(modifiedBoard({ id: idList, name: event.target.value }));
  };
  const handleDeleteList = () => {
    dispatch(deleteList(idList));
    console.log("Borrando lista", idList);
  };

  return (
    <div className="lista" style={{ background: theme.bg, color: theme.text }}>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <Button onClick={handleDeleteList}>×</Button>
      </div>
      {status == "LOADING" && <p>Cargando tareas...</p>}
      {status == "FAILED" && <p>Ocurrió un error</p>}
      {status == "SUCCESS" && (
        <ul>
          {tasks.map((id) => (
            <Task key={id} id={id} />
          ))}
        </ul>
      )}
      <AddTask idList={idList} />
    </div>
  );
};
