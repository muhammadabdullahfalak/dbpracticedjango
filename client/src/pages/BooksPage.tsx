// import { useEffect, useState } from "react";
// import type { Book } from "../types/types";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../store/store";
// import {
//   fetchAllBooks,
//   addBook as addBookThunk,
//   updateBook as updateBookThunk,
//   deleteBook as deleteBookThunk,
// } from "../store/slices/bookSlice";

// export default function BooksPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const books = useSelector((state: RootState) => state.book.books);

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
//   const [editingBookId, setEditingBookId] = useState<number | null>(null);




//   useEffect(() => {
//     dispatch(fetchAllBooks());
//   }, [dispatch]);

//   const resetForm = () => {
//     setTitle("");
//     setAuthor("");
//     setReleaseYear(new Date().getFullYear());
//     setEditingBookId(null);
//   };

//   const handleSubmit = () => {
//     if (!title || !author || !releaseYear) return;

//     const book: Book = {
//       id: editingBookId || 0, // id ignored for new book on backend
//       title,
//       author,
//       releaseYear,
//     };

//     if (editingBookId !== null) {
//       dispatch(updateBookThunk(book));
//     } else {
//       dispatch(addBookThunk(book));
//     }
//     resetForm();
//   };

//   const handleDelete = (id: number) => {
//     dispatch(deleteBookThunk(id));
//     resetForm();
//   };

//   const handleEditClick = (book: Book) => {
//     setTitle(book.title);
//     setAuthor(book.author);
//     setReleaseYear(book.releaseYear);
//     setEditingBookId(book.id);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">{editingBookId ? "Edit Book" : "Add Book"}</h2>

//       <div className="mb-4 space-x-2">
//         <input
//           type="text"
//           placeholder="Title"
//           className="border p-1"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           className="border p-1"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Release Year"
//           className="border p-1"
//           value={releaseYear}
//           onChange={(e) => setReleaseYear(Number(e.target.value))}
//         />

//         <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1 rounded">
//           {editingBookId ? "Update Book" : "Add Book"}
//         </button>

//         {editingBookId && (
//           <button onClick={resetForm} className="bg-gray-500 text-white px-3 py-1 rounded">
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Book List</h3>
//       </div>

//       <table className="border border-black w-full mt-4">
//         <thead>
//           <tr>
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Title</th>
//             <th className="border p-2">Author</th>
//             <th className="border p-2">Release Year</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book) => (
//             <tr key={book.id}>
//               <td className="border p-2">{book.id}</td>
//               <td className="border p-2">{book.title}</td>
//               <td className="border p-2">{book.author}</td>
//               <td className="border p-2">{book.releaseYear}</td>
//               <td className="border p-2 space-x-2">
//                 <button
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleEditClick(book)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDelete(book.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// client/src/pages/BooksPage.tsx
import { useEffect, useState } from "react";
import type { Book } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchAllBooks,
  addBook as addBookThunk,
  updateBook as updateBookThunk,
  deleteBook as deleteBookThunk,
} from "../store/slices/bookSlice";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function BooksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // grab books from Redux
  const books = useSelector((state: RootState) => state.book.books);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseYear, setReleaseYear] = useState<number>(
    new Date().getFullYear()
  );
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setReleaseYear(new Date().getFullYear());
    setEditingBookId(null);
  };

  const handleSubmit = () => {
    if (!title || !author || !releaseYear) return;

    const book: Book = {
      id: editingBookId || 0,
      title,
      author,
      releaseYear,
    };

    if (editingBookId !== null) {
      dispatch(updateBookThunk(book));
    } else {
      dispatch(addBookThunk(book));
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteBookThunk(id));
    resetForm();
  };

  const handleEditClick = (book: Book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setReleaseYear(book.releaseYear);
    setEditingBookId(book.id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-4">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <h2 className="text-xl font-bold mb-2">
        {editingBookId ? "Edit Book" : "Add Book"}
      </h2>
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
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          {editingBookId ? "Update Book" : "Add Book"}
        </button>

        {editingBookId && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* List */}
      <h3 className="text-lg font-semibold mb-2">Book List</h3>
      <table className="border border-black w-full">
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
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEditClick(book)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(book.id)}
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
