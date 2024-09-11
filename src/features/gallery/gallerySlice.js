import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: []
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setCards (state, action) {
      state.cards = action.payload
    },
    addCard (state, action) {
      console.log(state.cards, action)
      state.cards = [action.payload, ...state.cards]
      console.log(state.cards)
    }
  },
})

export const getCards = (state) => state.gallery.cards
export const { setCards, addCard } = gallerySlice.actions
export default gallerySlice.reducer
