import { useEffect, useState } from "react";
import type { Book } from "../types/types";
import axios from "axios";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());

  const [editingBookId, setEditingBookId] = useState<number | null>(null); // 👈 new state

  const baseUrl=import.meta.env.VITE_API_BASE_URL

  const fetchBooks = async () => {
    
    const res = await axios.get(`${baseUrl}/books/`);
    setBooks(res.data as Book[]);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setReleaseYear(new Date().getFullYear());
    setEditingBookId(null);
  };

  const addBook = async (title: string, author: string, releaseYear: number) => {
    if (!title || !author || !releaseYear) return;

    try {
      await axios.post(`${baseUrl}/books/`, {
        title,
        author,
        releaseYear,
      });
      fetchBooks();
      resetForm();
    } catch (error) {
    console.error("Error adding book:", error);
  }
};

  const updateBook = async (id: number, data: Partial<Book>) => {
  await axios.put(`${baseUrl}/books/${id}/`, data);
  fetchBooks();
  resetForm();
};

  const deleteBook = async (id: number) => {
  await axios.delete(`${baseUrl}/books/${id}/`);
  fetchBooks();
};

  const handleSubmit = () => {
    if (editingBookId !== null) {
      updateBook(editingBookId, { title, author, releaseYear });
    } else {
      addBook(title, author, releaseYear);
    }
  };

  const handleEditClick = (book: Book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setReleaseYear(book.releaseYear);
    setEditingBookId(book.id);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{editingBookId ? "Edit Book" : "Add Book"}</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Title"
          className="border p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-1"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year"
          className="border p-1"
          value={releaseYear}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {editingBookId ? "Update Book" : "Add Book"}
        </button>

        {editingBookId && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Book List</h3>
      </div>

      <table className="border border-black w-full mt-4">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Release Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.releaseYear}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditClick(book)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
