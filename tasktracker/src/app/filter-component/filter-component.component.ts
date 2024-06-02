import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { Status } from '../models/Status';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-filter-component',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIcon], // Include MatButtonModule here
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})

export class FilterComponent implements OnInit {
  selectStatus(status: any) {
    console.log(status)  
    this.statusSelected.emit(status);
  }
  
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
    
  statuses = Object.values(Status); // Get the enum values

  ngOnInit(): void {
    
  }
}
