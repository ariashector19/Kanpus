import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  exchangeLists,
  useCreateListMutation,
  useDeleteListMutation,
  useGetListsQuery,
} from "../../../../slices/apiSlice";
import ui, {
  FieldButton,
  Item,
  OptionButton,
  Card,
} from "../../../../utils/ui";

const EditList = () => {
  const { id } = useLoaderData();
  const { data: lists, isSuccess } = useGetListsQuery(id);
  const dispatch = useDispatch();
  const [deleteList, setDeleteList] = useDeleteListMutation();
  const [newList, setNewList] = useState("");
  const [createList, setCreateList] = useCreateListMutation();

  const moveLists = (idList) => () => dispatch(exchangeLists({ id, idList }));

  const handleSubmit = (event) => {
    event.preventDefault();
    createList({ name: newList, board: id, order: lists.length + 1 });
    setNewList("");
  };

  return (
    <>
      <div className="p-6 max-w-[60rem] m-auto">
        <Card
          top={"Editando lists"}
          bottom={
            <form onSubmit={handleSubmit}>
              <FieldButton
                input={{
                  type: "text",
                  placeholder: "Nueva lista",
                  value: newList,
                  onChange: (e) => setNewList(e.target.value),
                }}
                button={{ type: "submit", children: "Crear lista" }}
              />
            </form>
          }
        >
          {isSuccess ? (
            lists.map((val) => (
              <Item
                key={val.id}
                principal={<p>{val.name}</p>}
                options={
                  <>
                    <OptionButton onClick={moveLists(val.order - 1)}>
                      &uarr;
                    </OptionButton>
                    <OptionButton
                      className={ui.option}
                      onClick={moveLists(val.order)}
                    >
                      &darr;
                    </OptionButton>
                    <OptionButton
                      className={ui.option}
                      onClick={() => deleteList(val.id)}
                    >
                      ×
                    </OptionButton>
                  </>
                }
              />
            ))
          ) : (
            <>Cargando...</>
          )}
        </Card>
      </div>
    </>
  );
};

export default EditList;
