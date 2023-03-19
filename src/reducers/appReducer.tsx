import { FamilyRestroomTwoTone } from "@mui/icons-material";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type AppStore = {
  isLoggedIn: boolean,
  email: string,
  isLoading: boolean,
  error: string, 
};

const initialState: AppStore = {
    isLoggedIn: false,
    email: "",
    isLoading: true,
    error: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    loginSuccessful: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        email: action.payload.email,
        error: "",
      };
    },
    closeError: (state, action)=>{
      return {
        ...state,
        error: "",
      }
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        isLoading: false,
        error: action.payload.error ?? "",
      };
    },
    logedOut: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        isLoading: true,
        error: "",
      };
    },
  },
});
export default appSlice.reducer;

export const appDataSelector = (state: RootState) : AppStore => state.app;


export const { loginSuccessful, loginFailed, closeError, logedOut } = appSlice.actions;

export const login = createAction<Record<string,any>>(`APP/LOGIN`);
export const verifyAuth = createAction<void>(`APP/VERIFY_AUTH`);


