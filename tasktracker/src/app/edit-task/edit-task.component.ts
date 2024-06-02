
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../models/task';
import { TaskService } from '../service/task.service'; // Import TaskService

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  providers: [TaskService] // Add TaskService to providers
})
export class EditTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService // Correct injection
  ) {}

  save(): void {
    this.taskService.editTask(this.data).subscribe({
      next: () => {
        console.log('Task updated successfully');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}