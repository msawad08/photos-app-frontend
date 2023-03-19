import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type UserStore = {
  users: Record<string, any>[];
  totalNoOfUsers: number;
  rowsPerPage: number;
  page: number;
};

const initialState: UserStore = {
  users: [],
  totalNoOfUsers: 0,
  rowsPerPage: 10,
  page: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changePaginate: (state, action) => {
      const { rowsPerPage, page } = action.payload;
      return {
        ...state,
        page: page ?? state.page,
        rowsPerPage: rowsPerPage ?? state.rowsPerPage,
      };
    },
    getAllUsersSuccess: (state, action) => {
      return {
        ...state,
        users: action.payload.data,
        totalNoOfUsers: (action.payload?.totalCount || [])[0]?.count ?? 0,
      };
    },
    getAllUsersFailure: (state, action) => {
      return state;
    },
  },
});
export default userSlice.reducer;

export const userDataSelector = (state: RootState): UserStore => state.user;

export const { getAllUsersSuccess, getAllUsersFailure, changePaginate } =
  userSlice.actions;

export const getAllUsers =
  createAction<Record<string, any>>(`USERS/GET_ALL_USERS`);
