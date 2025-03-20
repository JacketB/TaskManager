import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  columnId: number;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.baseUrl}/task-columns`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  updateTaskColumn(taskId: number, newColumnId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/tasks/${taskId}`, { columnId: newColumnId });
  }

  createTask(task: {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    userId: number;
    columnId: number;
    projectId: number;
    created_at: string;
    isCompleted: boolean;
  }) {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  getTasksByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/project/${projectId}`);
  }
}
