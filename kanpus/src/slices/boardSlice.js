import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api";
import { createdTask, movedTask, loadedTasks, deletedTask } from "./tasksSlice";

const initialState = {
  status: "LOADING",
  lists: {},
};

export const loadBoard = createAsyncThunk(
  "board/loadBoard",
  async () => await client.board.get()
);
export const createdList = createAsyncThunk(
  "board/createdList",
  async (name) => await client.board.post({ name })
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    takedTask(state, action) {
      state.lists[action.payload.from_id].list.splice(
        state.lists[action.payload.from_id].list.indexOf(
          action.payload.task_id
        ),
        1
      );
    },
    addedTask(state, action) {
      const orden =
        action.payload.orden ?? state.lists[action.payload.to_id].list.length;
      state.lists[action.payload.to_id].list.splice(
        orden,
        0,
        action.payload.task_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createdTask.fulfilled, (state, action) => {
        state.lists[action.payload.list].list.push(action.payload.id);
      })
      .addCase(deletedTask.fulfilled, (state, action) => {
        for (let t in state.lists) {
          const index = state.lists[t].list.indexOf(action.meta.arg);
          if (index > -1) {
            state.lists[t].list.splice(index, 1);
          }
        }
      })
      .addCase(loadBoard.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loadBoard.fulfilled, (state, action) => {
        for (let list of action.payload) {
          state.lists[list.id] = list;
        }
        state.status = "SUCCESS";
      })
      .addCase(loadBoard.rejected, (state) => {
        state.status = "FAILED";
      })
      .addCase(loadedTasks.fulfilled, (state, action) => {
        for (let l in state.lists) {
          state.lists[l].list = [];
        }
        for (lettask of action.payload) {
          state.lists[task.list].list.push(task.id);
        }
      })
      .addCase(createdList.fulfilled, (state, action) => {
        state.lists[action.payload.id] = {
          name: action.payload.name,
          list: [],
        };
      });
  },
});

const { takedTask, addedTask } = boardSlice.actions;

// Escribimos la lógica de mover unatask en forma de "thunk",
// que lanza a su vez las acciones de quitar latask de un
// board y agregarla a otro.
// La función `movedTaskRight` es un "thunk action creator", que una vez
// que se llama con parámetros devuelve un "thunk". Los "thunks" se
// pueden despachar igual que las acciones, con dispatch().
export const movedTaskRight = (task_id) => (dispatch, getState) => {
  // Consultar el board actual
  const board = getState().board.lists;
  // Encontrar la list a la que pertenece latask
  const from_index = Object.values(board).findIndex((v) =>
    v.list.includes(task_id)
  );
  // Calcular la siguiente list
  const to_index = from_index + 1;
  // Solo movemos si existe una list más a la derecha
  if (to_index < Object.keys(board).length) {
    const [from_id, to_id] = Object.keys(board).slice(from_index, to_index + 1);
    dispatch(movedTask({ id: task_id, list: to_id })).then(() => {
      dispatch(takedTask({ task_id, from_id }));
      dispatch(addedTask({ task_id, to_id }));
    });
  }
};
export const movedTaskLeft = (task_id) => (dispatch, getState) => {
  const board = getState().board.lists;
  const from_index = Object.values(board).findIndex((v) =>
    v.list.includes(task_id)
  );
  const to_index = from_index - 1;
  if (to_index >= 0) {
    const [to_id, from_id] = Object.keys(board).slice(to_index, from_index + 1);
    dispatch(movedTask({ id: task_id, list: to_id })).then(() => {
      dispatch(takedTask({ task_id, from_id }));
      dispatch(addedTask({ task_id, to_id }));
    });
  }
};

export default boardSlice.reducer;

// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { created, deleted } from "./TaskSlice";

// const initialState = {
//   todo: {
//     name: "Pendiente",
//     list: [2, 3],
//   },
//   doing: {
//     name: "En proceso",
//     list: [1],
//   },
//   done: {
//     name: "Completado",
//     list: [],
//   },
// };

// const boardSlice = createSlice({
//   name: "board",
//   initialState,
//   reducers: {
//     createdList: {
//       reducer(state, action) {
//         state[action.payload.id] = {
//           name: action.payload.name,
//           list: [],
//         };
//       },
//       prepare(name) {
//         return { payload: { id: nanoid(), name } };
//       },
//     },
//     takedTask(state, action) {
//       state[action.payload.from_id].list.splice(
//         state[action.payload.from_id].list.indexOf(action.payload.task_id),
//         1
//       );
//     },
//     addedTask(state, action) {
//       const orden =
//         action.payload.orden ?? state[action.payload.to_id].list.length;
//       state[action.payload.to_id].list.splice(orden, 0, action.payload.task_id);
//     },
//     modifiedBoard(state, action) {
//       state[action.payload.id].name = action.payload.name;
//     },
//     deletedBoard(state, action) {
//       delete state[action.payload.id];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(created, (state, action) => {
//         if (state[action.payload.idList]) {
//           state[action.payload.idList].list.push(action.payload.id);
//         }
//       })
//       .addCase(deleted, (state, action) => {
//         for (let t in state) {
//           const index = state[t].list.indexOf(action.payload);
//           if (index > -1) {
//             state[t].list.splice(index, 1);
//           }
//         }
//       });
//   },
// });

// export const taskMovedToRight = (task_id) => (dispatch, getState) => {
//   // Consultar el board actual
//   const board = getState().board;
//   // Encontrar la list a la que pertenece latask
//   const from_index = Object.values(board).findIndex((v) =>
//     v.list.includes(task_id)
//   );
//   // Calcular la siguiente list
//   const to_index = from_index + 1;
//   // Solo movemos si existe una list más a la derecha
//   if (to_index < Object.keys(board).length) {
//     const [from_id, to_id] = Object.keys(board).slice(from_index, to_index + 1);
//     dispatch(takedTask({ task_id, from_id }));
//     dispatch(addedTask({ task_id, to_id }));
//   }
// };
// export const taskMovedToLeft = (task_id) => (dispatch, getState) => {
//   const board = getState().board;
//   const from_index = Object.values(board).findIndex((v) =>
//     v.list.includes(task_id)
//   );
//   const to_index = from_index - 1;
//   if (to_index >= 0) {
//     const [to_id, from_id] = Object.keys(board).slice(to_index, from_index + 1);
//     dispatch(takedTask({ task_id, from_id }));
//     dispatch(addedTask({ task_id, to_id }));
//   }
// };

// export const deleteList = (id) => (dispatch, getState) => {
//   const board = getState().board;
//   const list = board[id].list;
//   for (let t of list) {
//     dispatch(deleted(t));
//   }
//   dispatch(deletedBoard({ id }));
// };

// export const {
//   createdList,
//   takedTask,
//   addedTask,
//   modifiedBoard,
//   deletedBoard,
// } = boardSlice.actions;
// export default boardSlice.reducer;
