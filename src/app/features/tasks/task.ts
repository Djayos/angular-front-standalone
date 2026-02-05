import { Injectable } from '@angular/core';
import { Task } from './task.model';


/**
 * Service central qui gère les tâches et services de l'application
 *
 * Rôle :
 * - Stock les tâches en mémoire (tableau `tasks`)
 * - Permet de lire/ajouter/modifier/supprimer des tâches
 * - Appels venant des composants (liste, détail, formulaire)
 * - Données (liste ou tâche) retournées aux composants
 * - Mise à jour de l'état interne + sauvegarde dans localStorage
 */

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storageKey = 'task-manager.tasks'; //recup dans le localstorage
  private tasks: Task[] = [];

  constructor() {
    this.tasks = this.load();

    // si rien en storage, on met quelques tasks de départ 
    if (this.tasks.length === 0) {
      this.tasks = this.seed();
      this.save();
    }
  }

  // return toutes les taches
  getAll(): Task[] {
    return [...this.tasks];
  }

  // return une tache par son id, ou undefined si pas trouvé
  getById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  // add une nouvelle tache avec les données du formulaire, et sauvegarde dans le storage
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

  // modifie une tahce existante
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

  // supp une tache a partir de son id
  delete(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  // load les taches dans le localstorage, sinon return un tableau vide
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

