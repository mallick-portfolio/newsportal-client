import { accountApi } from "./api/accountApi";
import { newsApi } from "./api/newsApi";
import dashboardSlice from "./reducer/dashboardSlice";
import globalSlice from "./reducer/globalSlice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  global: globalSlice,
  dashboard: dashboardSlice,
  [accountApi.reducerPath]: accountApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
});
export default rootReducer;
