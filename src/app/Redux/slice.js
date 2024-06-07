const { createSlice,nanoid ,current} = require("@reduxjs/toolkit");

const initialState={
    users:[],

}

const Slice = createSlice({
    name:"Role",
    initialState,
    reducers:{
        AddRole:(state,action)=>{
            console.log("from Slice",action)
        const Role = {
            // id:nanoid(),
            role:action.payload
        }
        
        state.users.push(Role.role);
        
        // let userRoleData = JSON.stringify(current(state.users))
        // localStorage.setItem("Roles",userRoleData )
    //    console.log(current(state.user))
        }
    }

})
export const {AddRole} = Slice.actions;
export default Slice.reducer;


