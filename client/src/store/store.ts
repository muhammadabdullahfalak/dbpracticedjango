import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from './slices/bookSlice'
import { authReducer } from './slices/authSlice'

export const store = configureStore({
  reducer: { 
    book: bookReducer, 
    auth: authReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch