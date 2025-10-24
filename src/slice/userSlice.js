import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

export const userSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userInfo: (state,action) => {
      state.value = action.payload;
 
    },
    
  },
})

export const { userInfo } = userSlice.actions

export default userSlice.reducer