import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TasksComponent } from './pages/tasks/tasks';
import { TaskDetailComponent } from './pages/task-detail/task-detail';
import { TaskFormComponent } from './pages/task-form/task-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '' },
];
