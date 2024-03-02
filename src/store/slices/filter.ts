import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { rootState } from "@store/index";
import axios from "@utils/axios";

const fetchFilterOptions = createAsyncThunk("filter/fetchFilterOptions", async (type: string) => {
  const fetch = async () => {
    const { data }: { data: (string | number)[] } = await axios.post(
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
    if (error instanceof Error) {
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

const fetchFields = createAsyncThunk("filter/fetchFields", async (_, thunkAPI) => {
  const fetch = async () => {
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
    return data;
  };
  try {
    const fields = await fetch();
    const iterableFieldTypes = fields.filter((field) => field !== "product");
    iterableFieldTypes.forEach((type) => thunkAPI.dispatch(fetchFilterOptions(type)));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    const fields = await fetch();
    const iterableFieldTypes = fields.filter((field) => field !== "product");
    iterableFieldTypes.forEach((type) => thunkAPI.dispatch(fetchFilterOptions(type)));
  }
});

const fetchIdsFilter = createAsyncThunk("filter/fetchIdsFilter", async (search: string | number, thunkAPI) => {
  const state = thunkAPI.getState() as rootState;
  const type = state.filter.type as string;
  const fetch = async () => {
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
  };
  try {
    return await fetch();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return await fetch();
  }
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
