import { useState } from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../../../../slices/apiSlice";
import { FieldButton } from "../../../../utils/ui";

const MyBoards = () => {
  const { user } = useRouteLoaderData("sesion");
  const {
    data: boards,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetBoardsQuery(user);

  const [boardName, setBoardName] = useState("");
  const [createBoard, result] = useCreateBoardMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    createBoard({ name: boardName, account: user });
    setBoardName("");
  };

  return (
    <div className="p-6 max-w-[60rem] m-auto">
      {isLoading ? (
        "Cargando tus boards..."
      ) : (
        <div className={isFetching ? "animate-pulse" : ""}>
          {boards.map((t) => (
            <Link
              key={t.id}
              to={`/boards/${t.id}`}
              className="block p-6 text-xl bg-gray-300 dark:bg-gray-600 rounded mb-6 hover:brightness-125 shadow-lg focus:brightness-125"
            >
              {t.name}
            </Link>
          ))}
        </div>
      )}
      <form className="text-xl flex flex-row gap-3" onSubmit={handleSubmit}>
        <FieldButton
          input={{
            placeholder: "Nuevo tablero",
            value: boardName,
            onChange: (e) => setBoardName(e.target.value),
          }}
          button={{ type: "submit", children: "Crear" }}
        />
      </form>
    </div>
  );
};

export default MyBoards;
