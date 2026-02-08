import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    farmer: null,
    buyer: null,
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
  },
});

export const { setLoggedInUserRole, setLoggedInFarmer, setLoggedInBuyer } =
  userSlice.actions;
export default userSlice.reducer;
