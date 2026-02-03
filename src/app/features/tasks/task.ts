import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storageKey = 'task-manager.tasks';
  private tasks: Task[] = [];

  constructor() {
    this.tasks = this.load();

    // Si rien en storage, on met quelques tasks de départ (optionnel mais pratique)
    if (this.tasks.length === 0) {
      this.tasks = this.seed();
      this.save();
    }
  }

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
  this.save();
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
    this.save();
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }


  private load(): Task[] {
  const raw = localStorage.getItem(this.storageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Task[];
    // petite sécurité : si ce n'est pas un tableau, on ignore
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

private save() {
  localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
}

private seed(): Task[] {
  const now = new Date().toISOString();
  return [
    {
      id: '1',
      title: 'Learn Angular standalone',
      description: 'Understand routing, components, services',
      status: 'in_progress',
      priority: 'high',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '2',
      title: 'Build task list UI',
      description: 'Show tasks, status and priority',
      status: 'todo',
      priority: 'medium',
      createdAt: now,
      updatedAt: now,
    },
  ];
}


}

