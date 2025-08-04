import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'  
import type { RootState } from '../store'

// Thunk to exchange session cookie for JWT tokens
export const fetchTokens = createAsyncThunk(
  'auth/fetchTokens',
  async (_, { rejectWithValue }) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/token/`, {
      credentials: 'include',
    })
    if (!res.ok) {
      const err = await res.json()
      return rejectWithValue(err)
    }
    return await res.json() as { access: string; refresh: string }
  }
)

export interface AuthState {
  user: any | null
  access: string | null
  refresh: string | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  user: null,
  access: null,
  refresh: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.access = null
      state.refresh = null
      window.localStorage.removeItem('access')
      window.localStorage.removeItem('refresh')
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.status = 'idle'
        state.access = action.payload.access
        state.refresh = action.payload.refresh
        window.localStorage.setItem('access', action.payload.access)
        window.localStorage.setItem('refresh', action.payload.refresh)
      })
      .addCase(fetchTokens.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { logout, setUser } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export const authReducer = authSlice.reducer
