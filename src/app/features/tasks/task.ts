import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    {
      id: 't1',
      title: 'Learn Angular standalone',
      description: 'Understand routing, components, services',
      status: 'in_progress',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 't2',
      title: 'Build task list UI',
      description: 'Show tasks, status and priority',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAll(): Task[] {
    // return a copy to avoid accidental mutation from outside
    return [...this.tasks];
  }

  getById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }
}

