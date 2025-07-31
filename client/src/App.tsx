import BooksPage from "./pages/BooksPage";
import "./App.css";

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <BooksPage />
    </div>
  );
}
