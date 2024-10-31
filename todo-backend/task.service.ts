import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './src/task/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto, userId: number) {
    const task = this.taskRepository.create({ ...createTaskDto, user: { id: userId } });
    return this.taskRepository.save(task);
  }

  async findAll(userId: number) {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number, userId: number) {
    return this.taskRepository.findOne({ where: { id, user: { id: userId } } });
  }

  async update(id: number, updateTaskDto, userId: number) {
    const task = await this.findOne(id, userId);
    if (task) {
      return this.taskRepository.save({ ...task, ...updateTaskDto });
    }
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    if (task) {
      return this.taskRepository.remove(task);
    }
  }
}
