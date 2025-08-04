// client/src/pages/LoginPage.tsx
export const LoginPage = () => {
  const handleGoogleLogin = () => {
  const API    = import.meta.env.VITE_API_BASE_URL       // e.g. http://127.0.0.1:8000
  const CLIENT = window.location.origin                 // e.g. http://localhost:5173

  window.location.href =
    // must hit /auth/google/login/, not /auth/google/
    `${API}/auth/google/login/?process=login` +
    `&next=${encodeURIComponent(CLIENT + '/google-auth-callback/')}`
}

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in with Google</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}
