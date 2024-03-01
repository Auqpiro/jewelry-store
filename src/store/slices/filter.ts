import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { rootStore } from "@store/index";
import axios from "@utils/axios";

const fetchFilterOptions = createAsyncThunk("filter/fetchFilterOptions", async (type: string) => {
  const { data }: { data: (string | number)[] } = await axios.post(
    "/",
    { action: "get_fields", params: { field: type } },
    {
      transformResponse: [
        (data) => {
          const { result } = JSON.parse(data);
          const uniqOptionsType = new Set(result);
          uniqOptionsType.delete(null);
          return Array.from(uniqOptionsType);
        },
      ],
    }
  );
  return {
    type,
    entities: data,
  };
});

const fetchFields = createAsyncThunk("filter/fetchFields", async (_, thunkAPI) => {
  const { data }: { data: string[] } = await axios.post(
    "/",
    { action: "get_fields" },
    {
      transformResponse: [
        (data) => {
          const { result } = JSON.parse(data);
          return result;
        },
      ],
    }
  );
  const iterableFieldTypes = data.filter((field) => field !== "product");
  iterableFieldTypes.forEach((type) => thunkAPI.dispatch(fetchFilterOptions(type)));
  return;
});

const fetchIdsFilter = createAsyncThunk("filter/fetchIdsFilter", async (search: string, thunkAPI) => {
  const state = thunkAPI.getState() as rootStore;
  const type = state.getState().filter.type as string;
  const { data } = await axios.post(
    "/",
    {
      action: "filter",
      params: { [type]: search },
    },
    {
      transformResponse: [
        function (data) {
          const { result } = JSON.parse(data);
          const uniqSearchedIds = new Set(result);
          return Array.from(uniqSearchedIds);
        },
      ],
    }
  );
  return data;
});

type InitialState = {
  type: null | string;
  options: Record<string, (string | number)[]>;
};

const initialState: InitialState = {
  type: null,
  options: {
    price: [],
    brand: [],
  },
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectFilterType: (state, { payload }: { payload: string | null }) => {
      state.type = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilterOptions.fulfilled, (state, { payload }) => {
      const { type, entities } = payload;
      state.options[type] = entities;
    });
  },
});

export const { selectFilterType } = filter.actions;

export { fetchFilterOptions, fetchFields, fetchIdsFilter };

export default filter.reducer;
