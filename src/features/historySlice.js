import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visited: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.visited = [action.payload, ...state.visited];
      console.log(state.visited);
    },
  },
});

export const selectHistory = (state) => state.history.visited;

export default historySlice.reducer;
