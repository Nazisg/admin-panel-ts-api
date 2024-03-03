import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export interface AuthState {
  employeeData:any
  user: {
    id: number | null;
    access_token: string | null;
    refresh_token: string | null;
  };
  profile: {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    role: {
      id: number | null;
      roleName: string | null;
    };
    status: string | null;
    mail: string | null;
    team: {
      id: number | null;
      teamName: string | null;
    };
    projects: [
      {
        id: number | null;
        projectName: string | null;
      }
    ];
  };
}

const initialState: AuthState = {
  employeeData : [],
  user: {
    id: null,
    access_token: null,
    refresh_token: null,
  },
  profile: {
    id: null,
    firstName: null,
    lastName: null,
    role: {
      id: null,
      roleName: null,
    },
    status: null,
    mail: null,
    team: {
      id: null,
      teamName: null,
    },
    projects: [
      {
        id: null,
        projectName: null,
      }
    ],
  },
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    setEmployeeData: (state, action: PayloadAction<any>) => {
      state.employeeData = action.payload;
    },
    setToken: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    logout: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "CRM:AUTH",
    storage,
    whitelist: ["user", "profile"],
  },
  authSlice.reducer
);

export const { setToken, logout, setUser,setEmployeeData } = authSlice.actions;

export default reducer;
