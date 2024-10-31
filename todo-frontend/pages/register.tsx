import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, { email, password });
      alert('Usuario registrado');
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p>{error}</p>}
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
