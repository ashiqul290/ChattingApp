import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value:  "",
}

export const messageSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    selecteduser: (state,action) => {
      state.value = action.payload;
 
    },
    
  },
})

export const { selecteduser } = messageSlice.actions

export default messageSlice.reducer