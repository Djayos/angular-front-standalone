import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../features/tasks/task';
import { Task } from '../../features/tasks/task.model';
import { BadgeComponent } from '../../shared/ui/badge/badge';
import { ButtonComponent } from '../../shared/ui/button/button';
import { CardComponent } from '../../shared/ui/card/card';


/**
 * Composant responsable de l'affichage du détail d'une tâche.
 *
 * récupère l'identifiant de la tâche depuis l'URL,
 * charge la tâche correspondante via le TaskService, puis affiche ses informations.
 *
 * Il permet également de supprimer la tâche et
 * redirige l'utilisateur vers la liste après suppression.
 */

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, BadgeComponent, ButtonComponent],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetailComponent {
  task?: Task;
  // donnes les acces aux routes, services et navigation
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
  /**   
   * Supprime la tâche affichée après confirmation de l'utilisateur.
   * Si la tâche est supprimée, redirige vers la liste des tâches.
   */
  onDelete() {
    if (!this.task) return;

    const ok = confirm(`Supprimer "${this.task.title}" ?`);
    if (!ok) return;

    this.taskService.delete(this.task.id);
    this.router.navigate(['/tasks']);
  }

}
