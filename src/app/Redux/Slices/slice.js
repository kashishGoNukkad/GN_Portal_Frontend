

const { createSlice, nanoid } = require('@reduxjs/toolkit');

const initialState = {
  users: "",
  userId:"", // Initialize as an empty string
  searchResult:"",
  user:""
};

const slice = createSlice({
  name: "Role",
  initialState,
  reducers: {
    AddRole: (state, action) => {
      console.log("from Slice", action);

      const role = action.payload;

      // Concatenate the new role to the existing users string
      state.users = state.users ? `${state.users},${role}` : role;

      // Store updated state in localStorage
      localStorage.setItem("Roles", state.users);
    },
    userId: (state, action) => {
      console.log("from userid", action);

      const user_id = action.payload;

      // Concatenate the new role to the existing users string
      state.userId = state.userId ? `${state.userId},${user_id}` : user_id;

    //   Store updated state in localStorage
      localStorage.setItem("id", state.userId);
    },
    searchResult:(state,action)=>{
      console.log("search Result",action);
      const search = action.payload;
      state.searchResult = state.searchResult ? `${state.searchResult}` : search;
      localStorage.setItem("Services", state.searchResult);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },


  }
});

export const { AddRole, userId ,setUser, searchResult} = slice.actions;
export default slice.reducer;

