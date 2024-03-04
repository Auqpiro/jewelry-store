import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@utils/axios";
import { rootState } from "@store/index";

const fetchFilterOptions = createAsyncThunk("filter/fetchFilterOptions", async (type: string) => {
  const fetch = async () => {
    const { data }: { data: (string | number)[] } = await axiosInstance.post(
      "/",
      { action: "get_fields", params: { field: type } },
      {
        transformResponse: [
          (data) => {
            const { result } = JSON.parse(data);
            const optionsSet = new Set(result);
            optionsSet.delete(null);
            const options = [...optionsSet] as (string | number)[];
            options.sort((a: string | number, b: string | number) => {
              if (typeof a === "number" && typeof b === "number") {
                return a - b;
              }
              if (typeof a === "string" && typeof b === "string") {
                return a.localeCompare(b);
              }
              return 0;
            });
            return options;
          },
        ],
      }
    );
    return data;
  };
  try {
    const entities = await fetch();
    return {
      type,
      entities,
    };
  } catch (error) {
    if (error instanceof Error || axios.isCancel(error)) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    const entities = await fetch();
    return {
      type,
      entities,
    };
  }
});

const fetchIdsFilter = createAsyncThunk(
  "filter/fetchIdsFilter",
  async (payload: { search: string | number; abortSignal: AbortSignal }, thunkAPI) => {
    const { search, abortSignal } = payload;
    const state = thunkAPI.getState() as rootState;
    const type = state.filter.type as string;
    const fetch = async () => {
      const { data } = await axiosInstance.post(
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
          signal: abortSignal,
        }
      );
      return data;
    };
    try {
      return await fetch();
    } catch (error) {
      if (error instanceof Error || axios.isCancel(error)) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      return await fetch();
    }
  }
);

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

export { fetchFilterOptions, fetchIdsFilter };

export default filter.reducer;
