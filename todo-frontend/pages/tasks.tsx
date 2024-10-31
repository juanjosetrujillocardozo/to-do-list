import axios from 'axios';
import { useEffect, useState } from 'react';
import { isAuthenticated, checkTokenExpiration } from '../utils/auth';
import { useRouter } from 'next/router';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else if (!checkTokenExpiration()) {
      router.push('/login');
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    if (!title || !description) return;
    try {
      await axios.post(
        'http://localhost:3000/tasks',
        { title, description, status, dueDate },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Mis Tareas</h1>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={createTask}>Crear Tarea</button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Fecha de Vencimiento: {task.dueDate}</p>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
