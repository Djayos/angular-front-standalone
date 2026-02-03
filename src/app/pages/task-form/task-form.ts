import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../features/tasks/task';
import { ActivatedRoute } from '@angular/router';
import { TaskPriority, TaskStatus } from '../../features/tasks/task.model';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'],
})
export class TaskFormComponent {
  form;
  taskId: string | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      status: this.fb.nonNullable.control<TaskStatus>('todo', Validators.required),
      priority: this.fb.nonNullable.control<TaskPriority>('medium', Validators.required),
    });

    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.isEdit = true;
      const task = this.taskService.getById(this.taskId);

      if (task) {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
        });
      }
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    if (this.isEdit && this.taskId) {
      this.taskService.update(this.taskId, data);
      this.router.navigate(['/tasks', this.taskId]);
    } else {
      this.taskService.add(data);
      this.router.navigate(['/tasks']);
    }
  }
}
