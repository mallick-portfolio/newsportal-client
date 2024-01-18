import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    showCreateCategoryModal: false,
    showDeletePostModal: false,
    selectedItem: null,
  },
  reducers: {
    setShowCreateCategoryModal(state, action) {
      state.showCreateCategoryModal = action.payload;
    },
    setShowDeletePostModal(state, action) {
      state.showDeletePostModal = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
});

export const {
  setShowCreateCategoryModal,
  setShowDeletePostModal,
  setSelectedItem,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
