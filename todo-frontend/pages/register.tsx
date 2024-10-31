import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Email y contraseña son requeridos');
      return;
    }
    try {
      await axios.post('http://localhost:3000/auth/register', { email, password });
      alert('Usuario registrado con éxito');
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
