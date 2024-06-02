import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { FilterComponent } from '../filter-component/filter-component.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FilterComponent, CommonModule, MatIcon, MatDialogModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {
  filtredTasks: Task[];
  tasks: Task[];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filtredTasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.filtredTasks = this.filtredTasks.filter(t => t.id !== task.id);
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.editTask(result).subscribe(updatedTask => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.filtredTasks[index] = updatedTask;
          }
        });
      }
    });
  }

  handleStatusSelected(status: string): void {
    this.filtredTasks = this.tasks.filter(task => task.status === status);
  }
}