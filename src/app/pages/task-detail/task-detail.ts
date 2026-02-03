import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../features/tasks/task';
import { Task } from '../../features/tasks/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetailComponent {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getById(id);
    }
  }

  onDelete() {
    if (!this.task) return;

    const ok = confirm(`Supprimer "${this.task.title}" ?`);
    if (!ok) return;

    this.taskService.delete(this.task.id);
    this.router.navigate(['/tasks']);
  }

}
