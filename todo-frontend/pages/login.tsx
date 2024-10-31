import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email y contraseña son requeridos');
      console.log(error); // Para depuración
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      alert('Inicio de sesión exitoso');
      setError(''); 
    } catch (error) {
      setError('Credenciales inválidas');
      console.log(error); // Para depuración
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
