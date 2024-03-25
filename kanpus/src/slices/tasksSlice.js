import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api";

// El initialState puede ser el valor de estado inicial o bien una
// función que genere el estado inicial al llamarla, por ejemplo,
// leyendo desde localStorage
const initialState = { status: "LOADING", tasks: {} };

export const loadedTasks = createAsyncThunk(
  "tasks/loadedTasks",
  async () => await client.tasks.get()
);
export const createdTask = createAsyncThunk(
  "tasks/created",
  async ({ title, list }) => await client.tasks.post({ title, list })
);
export const deletedTask = createAsyncThunk(
  "tasks/deleted",
  async (id) => await client.tasks.delete(id)
);
export const movedTask = createAsyncThunk(
  "tasks/moved",
  async ({ id, list }) => await client.tasks.patch(id, { list })
);
export const renamedTask = createAsyncThunk(
  "tasks/renamed",
  async ({ id, title }) => await client.tasks.patch(id, { title })
);

// La herramienta createSlice nos facilita la creación de acciones
// y el reducer principal de la slice simplemente indicando reducers
// individuales nombrados como las acciones que queremos procesar
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadedTasks.fulfilled, (state, action) => {
        for (let task of action.payload) {
          state.tasks[task.id] = { title: task.title };
        }
        state.status = "SUCCESS";
      })
      .addCase(loadedTasks.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loadedTasks.rejected, (state) => {
        state.status = "FAILED";
      })
      .addCase(createdTask.fulfilled, (state, action) => {
        state.tasks[action.payload.id] = {
          title: action.payload.title,
        };
      })
      .addCase(deletedTask.fulfilled, (state, action) => {
        delete state.tasks[action.meta.arg];
      })
      .addCase(renamedTask.fulfilled, (state, action) => {
        state.tasks[action.payload.id].title = action.payload.title;
      });
  },
});

export default tasksSlice.reducer;

// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//   list: {
//     1: {
//       title: "Aprender componentes de React",
//     },
//     2: {
//       title: "Completar las prácticas del módulo 1",
//     },
//     3: {
//       title: "Realizar la autoevaluación",
//     },
//   },
// };

// const listSlice = createSlice({
//   name: "list",
//   initialState,
//   reducers: {
//     deleted(state, action) {
//       delete state.list[action.payload];
//     },
//     alternated(state, action) {
//       state.list[action.payload].completed =
//         !state.list[action.payload].completed;
//     },
//     modified(state, action) {
//       console.log("Modificando task reducer", action.payload.id);
//       state.list[action.payload.id].title = action.payload.title;
//     },
//     allDone(state) {
//       for (let id in state.list) {
//         state.list[id].completed = true;
//       }
//     },
//     created: {
//       prepare(title, listId) {
//         return { payload: { id: nanoid(), title, listId } };
//       },
//       reducer(state, action) {
//         state.list[action.payload.id] = {
//           title: action.payload.title,
//         };
//       },
//     },
//   },
// });

// export const duplicatedTask = (taskId) => (dispatch, getState) => {
//   const title = getState().tasks.list[taskId].title;
//   const board = getState().board;
//   const listId = Object.keys(board).find((k) => board[k].list.includes(taskId));
//   console.log("Duplicando task", taskId, title, listId);

//   dispatch(created(title, listId));
// };

// export const { created, deleted, alternated, modified, allDone } =
//   listSlice.actions;

// export default listSlice.reducer;
