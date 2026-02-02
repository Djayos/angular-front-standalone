import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TasksComponent } from './pages/tasks/tasks';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '' },
];
