import { createSlice } from "@reduxjs/toolkit";

export const basicReducer = createSlice({
  name: "basicReducer",
  initialState: {
    resourceItem: {
      title: "",
      description: "",
      link: "",
      resourceName: "",
      link: "",
    },
    responseMessage: {
      open: false,
      status: "",
      message: "",
    },
  },
  reducers: {
    setResourceItem: (state, action) => {
      state.resourceItem = action.payload;
    },
    setResponseMessage: (state, action) => {
      state.responseMessage = action.payload;
    },
  },
});

export const { setResourceItem, setResponseMessage } = basicReducer.actions;

export default basicReducer.reducer;
