import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(response.data);
  };

  const createTask = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      { title, description, status, dueDate },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tareas</h1>
      <input type="text" placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>
      <input type="date" onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={createTask}>Crear Tarea</button>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
