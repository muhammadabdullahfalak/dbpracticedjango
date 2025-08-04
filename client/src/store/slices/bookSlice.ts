import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Book } from '../../types/types';

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

// ✅ Async thunks
export const fetchAllBooks = createAsyncThunk('book/fetchAllBooks', async () => {
  const res = await fetch(`${baseURL}/books/`);
  return await res.json();
});

export const addBook = createAsyncThunk('book/addBook', async (newBook: Book) => {
  const res = await fetch(`${baseURL}/books/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  return await res.json();
});

export const updateBook = createAsyncThunk('book/updateBook', async (updatedBook: Book) => {
  const res = await fetch(`${baseURL}/books/${updatedBook.id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  });
  return await res.json();
});

export const deleteBook = createAsyncThunk('book/deleteBook', async (id: number) => {
  await fetch(`${baseURL}/books/${id}/`, { method: 'DELETE' });
  return id;
});

// ✅ Slice
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      })
      .addCase(fetchAllBooks.pending, (_state) => {
        console.log("Fetching books...");
      })
      .addCase(fetchAllBooks.rejected, (_state, action) => {
        console.error("Failed to fetch books:", action.error);
      });
  },
});

export const bookReducer = bookSlice.reducer;
