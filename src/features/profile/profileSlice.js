import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: "",
  email: '',
  about: '',
  avatar: '',
  cohort: '',
  name: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateEmail (state, action) {
      state.email = action.payload
    },
    setProfile (state, action) {
      state._id = action.payload._id
      state.avatar = action.payload.avatar
      state.about = action.payload.about
      state.cohort = action.payload.cohort
      state.name = action.payload.name
    }
  },
})

export const getProfile = (state) => state.profile
export const getEmail = (state) => state.profile.email
export const { updateEmail, setProfile } = profileSlice.actions
export default profileSlice.reducer
