import { AddTask } from "./components/addTask/AddTask";
import { Button } from "./components/button/Button";
import { Header } from "./components/header/Header";
import { TaskList } from "./components/taskList/TaskList";
import { createContext, useState, useContext } from "react";
import { ThemeContext, themes } from "./utils/themeContext/Theme.js";
import { FormNewUser } from "./components/formNewUser/FormNewUser.jsx";
import { DropdownComponent } from "./components/dropdown/Dropdown.jsx";
import { Board } from "./components/board/Board";
import { useSelector } from "react-redux";

function App() {
  // en el componente App
  // const [tasks, setTasks] = useState([
  //   {
  //     title: "Aprender componentes de React",
  //     completed: false,
  //   },
  //   {
  //     title: "Completar las prácticas del módulo 1",
  //     completed: true,
  //   },
  //   {
  //     title: "Realizar la autoevaluación",
  //     completed: false,
  //   },
  // ]);

  // const addTask = (title) => {
  //   const newTask = { title, completed: false };
  //   setTasks([...tasks, newTask]);
  // };

  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div className="App">
        <h1>Kanpus</h1>
        {/* <Header /> */}
        <Board />
        {theme == "light" ? (
          <Button onClick={() => setTheme("dark")}>Activar tema oscuro</Button>
        ) : (
          <Button onClick={() => setTheme("light")}>Activar tema claro</Button>
        )}
      </div>
      <DropdownComponent />
    </ThemeContext.Provider>
  );
}

export default App;
