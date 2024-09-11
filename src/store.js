import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import galleryReducer from './features/gallery/gallerySlice.js'
import profileReducer from './features/profile/profileSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    profile: profileReducer,
  },
})

export default store
