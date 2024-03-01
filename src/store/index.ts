import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "@store/slices/items";
import filterReducer from "@store/slices/filter";
import paginationReducer from "@store/slices/pagination";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
});

export type rootStore = typeof store;

export type appDispatch = typeof store.dispatch;

export default store;
