import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Learn Angular standalone',
      description: 'Understand routing, components, services',
      status: 'in_progress',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Build task list UI',
      description: 'Show tasks, status and priority',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAll(): Task[] {
    return [...this.tasks];
  }

  getById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  add(data: {
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}) {
  const now = new Date().toISOString();

  this.tasks.push({
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description ?? '',
    status: data.status,
    priority: data.priority,
    createdAt: now,
    updatedAt: now,
  });
}
  update(
    id: string,
    data: {
      title: string;
      description: string;
      status: 'todo' | 'in_progress' | 'done';
      priority: 'low' | 'medium' | 'high';
    }
  ) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    task.title = data.title;
    task.description = data.description;
    task.status = data.status;
    task.priority = data.priority;
    task.updatedAt = new Date().toISOString();
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }


}

