import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      const jwt = getState().auth.token;
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Board", "List"],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: (account) => `/boards?account=${account}`,
      providesTags: ["Myboards"],
    }),
    createBoard: builder.mutation({
      query: ({ name, account }) => ({
        url: "/boards",
        method: "POST",
        body: { name, account },
      }),
      invalidatesTags: ["Myboards"],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Myboards"],
    }),
    getlists: builder.query({
      query: (id) => `/lists?board=${id}&_sort=orden`,
      providesTags: ["Board"],
    }),
    getTareas: builder.query({
      query: () => "/tasks",
      providesTags: [{ type: "List", id: "TODAS" }],
    }),
    getListTareas: builder.query({
      query: (id) => `/tasks/?list=${id}`,
      providesTags: (result, error, id) => [{ type: "List", id }],
    }),
    createList: builder.mutation({
      query: ({ name, board, orden }) => ({
        url: "/lists",
        method: "POST",
        body: { name, board, orden },
      }),
      invalidatesTags: ["Board"],
    }),
    updateList: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/lists/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Board"],
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),
    createTarea: builder.mutation({
      query: ({ title, list }) => ({
        url: "/tasks",
        method: "POST",
        body: { title, list },
      }),
      invalidatesTags: (result, error, { list }) => [
        { type: "List", id: list },
        { type: "List", id: "TODAS" },
      ],
    }),
    updateTarea: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["List"],
    }),
    deleteTarea: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const exchangeLists = createAsyncThunk(
  "board/forward",
  async ({ id, idList }, { dispatch, getState }) => {
    if (idList <= 0) return;
    const { data: board } = apiSlice.endpoints.getlists.select(id)(getState());
    const prevIdx = board.findIndex((v) => v.orden === idList);
    const nextIdx = board.findIndex((v) => v.orden === idList + 1);
    if (nextIdx !== -1) {
      await dispatch(
        apiSlice.endpoints.updateList.initiate({
          id: board[prevIdx].id,
          orden: idList + 1,
        })
      ).then(() => {
        dispatch(
          apiSlice.endpoints.updateList.initiate({
            id: board[nextIdx].id,
            orden: idList,
          })
        );
      });
    }
  }
);

export const taskMovedLeft = createAsyncThunk(
  "tasks/movedLeft",
  async ({ id, idList, taskId }, { dispatch, getState }) => {
    // Consultar manualmente el board cargado por la API en el estado actual
    const { data: board } = apiSlice.endpoints.getlists.select(id)(getState());
    // Averiguar la list anterior a la actual
    const fromIdx = board.findIndex((v) => v.id === idList);
    const toIdx = fromIdx - 1;

    if (toIdx >= 0) {
      // Lanzar manualmente una actualización de la tarea para modificar su list
      await dispatch(
        apiSlice.endpoints.updateTarea.initiate({
          id: taskId,
          list: board[toIdx].id,
        })
      );
    }
  }
);
export const taskMovedRight = createAsyncThunk(
  "tasks/movedRight",
  async ({ id, idList, taskId }, { dispatch, getState }) => {
    const { data: board } = apiSlice.endpoints.getlists.select(id)(getState());
    // Averiguar la list posterior a la actual
    const fromIdx = board.findIndex((v) => v.id === idList);
    const toIdx = fromIdx + 1;

    if (toIdx < board.length) {
      // Lanzar manualmente una actualización de la tarea para modificar su list
      await dispatch(
        apiSlice.endpoints.updateTarea.initiate({
          id: taskId,
          list: board[toIdx].id,
        })
      );
    }
  }
);

// Estos hooks se crean automáticamente al crear la api slice,
// nos permiten generar peticiones HTTP y obtener las respuestas
export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetListsQuery,
  useGetTasksQuery,
  useGetTaskListQuery,
  useCreateListMutation,
  useDeleteListMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;

export default apiSlice;
