import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    showCreateCategoryModal: false,
  },
  reducers: {
    setShowCreateCategoryModal(state, action) {
      console.log(action.payload);
      state.showCreateCategoryModal = action.payload;
    },
  },
});

export const { setShowCreateCategoryModal } = dashboardSlice.actions;
export default dashboardSlice.reducer;
