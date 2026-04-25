import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    farmer: null,
    buyer: null,
    driver:null,
    role: null,
  },
  reducers: {
    setLoggedInUserRole: (state, action) => {
      state.role = action.payload;
    },
    setLoggedInFarmer: (state, action) => {
      state.farmer = action.payload;
    },
    setLoggedInBuyer: (state, action) => {
      state.buyer = action.payload;
    },
    setLoggedInDriver:(state, action)=>{
      state.driver=action.payload;
    }
  },
});

export const { setLoggedInUserRole, setLoggedInFarmer, setLoggedInBuyer, setLoggedInDriver } =
  userSlice.actions;
export default userSlice.reducer;
