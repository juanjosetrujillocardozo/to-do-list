import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto, @Request() req) {
    try {
      return await this.taskService.create(createTaskDto, req.user.id);
    } catch (error) {
      throw new HttpException('Error al crear tarea', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Request() req) {
    return await this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const task = await this.taskService.findOne(id, req.user.id);
    if (!task) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto, @Request() req) {
    try {
      return await this.taskService.update(id, updateTaskDto, req.user.id);
    } catch (error) {
      throw new HttpException('Error al actualizar tarea', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    try {
      return await this.taskService.remove(id, req.user.id);
    } catch (error) {
      throw new HttpException('Error al eliminar tarea', HttpStatus.BAD_REQUEST);
    }
  }
}
