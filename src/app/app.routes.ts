import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TasksComponent } from './pages/tasks/tasks';
import { TaskDetailComponent } from './pages/task-detail/task-detail';
import { TaskFormComponent } from './pages/task-form/task-form';

/**
 * Définition des routes principales de l'application.
 *
 * Chaque route associe une URL (path) à un composant Angular.
 * Le routeur Angular analyse l'URL courante et affiche
 * le composant correspondant dans le <router-outlet>.
 */

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '' },
];
