import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../models/Status';
import { Task } from '../models/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [TaskService]
})
export class AddTaskComponent {
  taskId: string='';
  taskName: string = '';
  taskDescription: string = '';
  taskStatus: Status = Status.ToDo;
  assignedTo: string = '';

  statusOptions = Object.values(Status);

  constructor(private router: Router, private taskService: TaskService) {}

  onSubmit() {
    const newTask: Task = {
      id: this.taskId, // Server will generate the id
      title: this.taskName,
      description: this.taskDescription,
      status: this.taskStatus,
      assignedTo: this.assignedTo,
    };

    this.taskService.addTask(newTask)
      .subscribe(
        (task) => {
          console.log('Task added successfully:', task);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}