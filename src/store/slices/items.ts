import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@utils/axios";
import { rootState } from "@store/index";
import { fetchFields, fetchIdsFilter } from "@store/slices/filter";

const fetchIdsAll = createAsyncThunk("items/fetchIdsAll", async () => {
  const fetch = async () => {
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
  };
  try {
    const ids = await fetch();
    return ids;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    const ids = await fetch();
    return ids;
  }
});

const init = createAsyncThunk("init", (_, thunkAPI) => {
  thunkAPI.dispatch(fetchIdsAll());
  thunkAPI.dispatch(fetchFields());
});

const loadCurrentPage = createAsyncThunk("items/loadCurrentPage", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as rootState;
  const currentPage = state.pagination.currentPage;
  const pageItemsCount = 50;
  const padBegin = (currentPage - 1) * pageItemsCount + 1;
  const allIds = state.items.ids;
  const ids = allIds.slice(padBegin, padBegin + pageItemsCount);
  const fetch = async () => {
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
  };
  try {
    const items = await fetch();
    return items;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    const items = await fetch();
    return items;
  }
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
  isFetching: {
    ids: boolean;
    items: boolean;
  };
};

const initialState: InitialState = {
  ids: [],
  items: [],
  isFetching: {
    ids: true,
    items: false,
  },
};

const items = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdsAll.pending, (state) => {
        state.isFetching.ids = true;
      })
      .addCase(fetchIdsAll.fulfilled, (state, { payload }) => {
        state.isFetching.ids = false;
        state.ids = payload;
      })
      .addCase(fetchIdsFilter.pending, (state) => {
        state.isFetching.ids = true;
      })
      .addCase(fetchIdsFilter.fulfilled, (state, { payload }) => {
        state.isFetching.ids = false;
        state.ids = payload;
      })
      .addCase(loadCurrentPage.pending, (state) => {
        state.isFetching.items = true;
      })
      .addCase(loadCurrentPage.fulfilled, (state, { payload }) => {
        state.isFetching.items = false;
        state.items = payload;
      });
  },
});

export { fetchIdsAll, init, loadCurrentPage };

export default items.reducer;
