import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../models/task';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule } from '@angular/common';
import { TaskService } from '../service/task.service';


@Component({
    selector: 'task-grid',
    standalone: true,
    templateUrl: './task-grid.component.html',
    styleUrl: './task-grid.component.scss',
    imports: [MatCardModule, TaskCardComponent, CommonModule],
    providers:[TaskService]
})
export class TaskGridComponent implements OnInit {

  tasks:Task[];
  
  constructor
  (
    private taskService:TaskService,
  )
  
  {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
