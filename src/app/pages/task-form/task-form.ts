import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../features/tasks/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'],
})
export class TaskFormComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo' as const, Validators.required],
      priority: ['medium' as const, Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.taskService.add(this.form.getRawValue());
    this.router.navigate(['/tasks']);
  }
}
