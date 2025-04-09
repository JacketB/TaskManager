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

  updateTask(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
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

  getCommentsByTaskId(taskId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/comments/task/${taskId}`);
  }

  createComment(data: FormData | any) {
    return this.http.post(`${this.baseUrl}/comments`, data);
  }
}
