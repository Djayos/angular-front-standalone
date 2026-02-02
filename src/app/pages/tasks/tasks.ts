import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../features/tasks/task';
import { Task } from '../../features/tasks/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getAll();
  }
}
