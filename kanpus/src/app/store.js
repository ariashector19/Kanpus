import { configureStore } from "@reduxjs/toolkit";
import tasks from "../slices/tasksSlice";
import board from "../slices/boardSlice";

export const store = configureStore({
  reducer: { tasks, board },
});
