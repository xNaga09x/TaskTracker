  import { Component } from '@angular/core';
  import { TaskGridComponent } from '../task-grid/task-grid.component';
  import { Task } from '../models/task';
  import { Status } from '../models/Status';
  import { CommonModule } from '@angular/common';
import { TaskCardComponent } from "../task-card/task-card.component"; // Adaugă această linie
import { TaskListComponent } from '../task-list/task-list.component';
import {MatIconModule} from '@angular/material/icon';
import { FilterComponent } from '../filter-component/filter-component.component';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'tasks-view',
    standalone: true,
    templateUrl: './tasks-view.component.html',
    styleUrl: './tasks-view.component.scss',
    imports: [TaskGridComponent, CommonModule, TaskCardComponent, TaskListComponent, MatIconModule, FilterComponent, RouterModule]
})
   export class TasksViewComponent {
  
    isList:boolean = false;
  }
