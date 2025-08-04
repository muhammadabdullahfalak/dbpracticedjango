import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { fetchTokens } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const GoogleAuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>()
  const nav = useNavigate();

  useEffect(() => {
    
    dispatch(fetchTokens())
      .unwrap()
      .then(() => {
        nav('/');
      })
      .catch(() => {
        alert('Authentication failed, please try again.');
        nav('/login');
      });
  }, [dispatch, nav]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Completing sign-in…</p>
    </div>
  );
}
