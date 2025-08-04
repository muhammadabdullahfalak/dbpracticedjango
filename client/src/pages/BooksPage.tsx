// import { useEffect, useState } from "react";
// import type { Book } from "../types/types";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../store/store";
// import { fetchAllBooks } from "../store/slices/bookSlice";

// export default function BooksPage() {

//   const dispatch = useDispatch<AppDispatch>();
//   const books = useSelector((state: RootState) => state.book.books);

//   const fetchBooks = () => {
//     dispatch(fetchAllBooks());
//   };

//   const addBook = (title: string, author: string, releaseYear: number) => {
//     dispatch({
//       type: 'book/addBook',
//       payload: { title, author, releaseYear }
//     });
//   };

//   const updateBook = (id: number, updatedBook: Partial<Book>) => {
//     dispatch({
//       type: 'book/updateBook',
//       payload: { id, ...updatedBook }
//     });
//   };

//   const deleteBook = (id: number) => {
//     dispatch({
//       type: 'book/deleteBook',
//       payload: id
//     });
//   };

//   // State for form inputs

//   const [title, setTitle] = useState<string>("");
//   const [author, setAuthor] = useState<string>("");
//   const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());

//   const [editingBookId, setEditingBookId] = useState<number | null>(null); // 👈 new state

  

//   const resetForm = () => {
//     setTitle("");
//     setAuthor("");
//     setReleaseYear(new Date().getFullYear());
//     setEditingBookId(null);
//   };

//   const handleSubmit = () => {
//     if (editingBookId !== null) {
//       updateBook(editingBookId, { title, author, releaseYear });
//       resetForm();
//     } else {
//       addBook(title, author, releaseYear);
//       resetForm();
//     }
//   };

//   const handleDelete = (id: number) => {
//     deleteBook(id);
//     resetForm();
//   };

//   const handleEditClick = (book: Book) => {
//     setTitle(book.title);
//     setAuthor(book.author);
//     setReleaseYear(book.releaseYear);
//     setEditingBookId(book.id);
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

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

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           {editingBookId ? "Update Book" : "Add Book"}
//         </button>

//         {editingBookId && (
//           <button
//             onClick={resetForm}
//             className="bg-gray-500 text-white px-3 py-1 rounded"
//           >
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
//                 <button className="bg-red-500 text-white px-2 py-1 rounded"
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

export default function BooksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.book.books);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
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
      id: editingBookId || 0, // id ignored for new book on backend
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

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1 rounded">
          {editingBookId ? "Update Book" : "Add Book"}
        </button>

        {editingBookId && (
          <button onClick={resetForm} className="bg-gray-500 text-white px-3 py-1 rounded">
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
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
