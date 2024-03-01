import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@utils/axios";
import { rootStore } from "@store/index";
import { fetchFields, fetchIdsFilter } from "@store/slices/filter";

const fetchIdsAll = createAsyncThunk("fetchIdsAll", async () => {
  const { data }: { data: string[] } = await axios.post(
    "/",
    { action: "get_ids" },
    {
      transformResponse: [
        (data) => {
          const { result } = JSON.parse(data);
          const uniqIds = new Set(result);
          return Array.from(uniqIds);
        },
      ],
    }
  );
  return data;
});

const init = createAsyncThunk("init", (_, thunkAPI) => {
  thunkAPI.dispatch(fetchIdsAll());
  thunkAPI.dispatch(fetchFields());
});

const loadCurrentPage = createAsyncThunk("loadCurrentPage", async (_, thunkAPI) => {
  const store = thunkAPI.getState() as rootStore;
  const state = store.getState();
  const currentPage = state.pagination.currentPage;
  const pageItemsCount = 50;
  const padBegin = (currentPage - 1) * pageItemsCount + 1;
  const allIds = state.items.ids;
  const ids = allIds.slice(padBegin, pageItemsCount);
  const { data }: { data: Good[] } = await axios.post(
    "/",
    { action: "get_items", params: { ids } },
    {
      transformResponse: [
        (data) => {
          const { result }: { result: Good[] } = JSON.parse(data);
          const uniqGoods: Good[] = result.reduce((acc, good) => {
            const { id } = good;
            const isListed = acc.find((good) => good.id === id);
            return isListed ? acc : [...acc, good];
          }, [] as Good[]);
          return uniqGoods;
        },
      ],
    }
  );
  return data;
});

type Good = {
  id: string;
  product: string | null;
  brand: string | null;
  price: number;
};

type InitialState = {
  ids: string[];
  items: Good[];
  isFetching: boolean;
};

const initialState: InitialState = {
  ids: [],
  items: [],
  isFetching: true,
};

const items = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdsAll.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchIdsAll.fulfilled, (state, { payload }) => {
        state.ids = payload;
      })
      .addCase(fetchIdsFilter.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchIdsFilter.fulfilled, (state, { payload }) => {
        state.ids = payload;
      })
      .addCase(loadCurrentPage.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadCurrentPage.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.items = payload;
      });
  },
});

export { fetchIdsAll, init, loadCurrentPage };

export default items.reducer;
