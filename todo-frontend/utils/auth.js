import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }
  return false;
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }
  return false;
};
