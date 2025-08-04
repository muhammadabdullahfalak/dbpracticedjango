import { Routes, Route, Navigate } from 'react-router-dom';
import BooksPage from "./pages/BooksPage";
import { LoginPage } from "./pages/LoginPage";
import { GoogleAuthCallback } from "./pages/GoogleAuthCallback";
import { useSelector } from 'react-redux';
import { selectAuth } from './store/slices/authSlice';

export default function App() {
  const { access } = useSelector(selectAuth);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={access ? <BooksPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/google-auth-callback" element={<GoogleAuthCallback />} />
      </Routes>
    </div>
  );
}
