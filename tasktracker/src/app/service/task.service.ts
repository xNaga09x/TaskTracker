import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  baseUrl = "https://localhost:7000/Task";

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl, this.httpOptions);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseUrl, newTask, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task, this.httpOptions);
  }

  deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }
}