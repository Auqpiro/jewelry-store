import { createSlice } from "@reduxjs/toolkit";
import { fetchIdsAll } from "@store/slices/items";
import { fetchIdsFilter } from "@store/slices/filter";

const pageItemsCount = 50;

type InitialState = {
  currentPage: number;
  maxPage: number;
};

const initialState: InitialState = {
  currentPage: 1,
  maxPage: 1,
};

const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      if (payload > state.maxPage || payload < 0) {
        return;
      }
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdsAll.fulfilled, (state, { payload }) => {
        state.currentPage = 1;
        state.maxPage = Math.ceil(payload.length / pageItemsCount);
      })
      .addCase(fetchIdsFilter.fulfilled, (state, { payload }) => {
        state.currentPage = 1;
        state.maxPage = Math.ceil(payload.length / pageItemsCount);
      });
  },
});

export const { changePage } = pagination.actions;

export default pagination.reducer;
