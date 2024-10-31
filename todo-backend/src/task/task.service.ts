import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Crear una nueva tarea
  async create(createTaskDto: any, userId: number): Promise<Task> {
    const { title, description, status, dueDate } = createTaskDto;
    
    const task = this.taskRepository.create({
      title,
      description,
      status,
      dueDate,
      user: { id: userId } as User, // Relación con el usuario autenticado
    });

    return await this.taskRepository.save(task);
  }

  // Obtener todas las tareas del usuario
  async findAll(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user: { id: userId } } });
  }

  // Obtener una tarea específica por ID
  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    
    return task;
  }

  // Actualizar una tarea
  async update(id: number, updateTaskDto: any, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    Object.assign(task, updateTaskDto); // Actualiza los campos de la tarea con los datos nuevos
    return await this.taskRepository.save(task);
  }

  // Eliminar una tarea
  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    await this.taskRepository.remove(task);
  }
}
