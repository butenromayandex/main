import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createAuth (state, action) {
      state.isLoggedIn = true
      state.token = action.payload.token
    },
    removeAuth (state) {
      state.isLoggedIn = false
      state.token = ''
    },
    setLoggedIn (state, action) {
      state.isLoggedIn = action.payload
    }
  },
})

export const getLoggedIn = (state) => state.auth.isLoggedIn
export const getToken = (state) => state.auth.token
export const { createAuth, removeAuth,setLoggedIn } = authSlice.actions
export default authSlice.reducer
