import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task'; // Adjust the path as necessary
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatIcon],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
editTask(arg0: Task) {
  const dialogRef = this.dialog.open(EditTaskComponent, {
    data: arg0,
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    this.taskService.editTask(arg0);
  });

}
deleteTask(arg0: Task) {
  this.taskService.deleteTask(arg0.id);
}
  @Input() task: Task;

  constructor
  (
    private dialog:MatDialog,
    private taskService:TaskService,
  )
  {}
}