import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanService } from '../../kanban.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment"
import {TaskDetailDialogComponent} from "../task-detail-dialog/task-detail-dialog.component";

interface Task {
  id: number;
  title: string;
  description: string;
  columnId: number;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[] | any;
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectId: number = 0;
  columns: Column[] = [];
  connectedLists: string[] = [];
  restrictedColumns: number = 4;
  allTasks: any[] = [];

  columnsTranslate: any = {
    "opened": "открыто",
    "in work": "в работе",
    "review": "на проверке",
    "done": "выполнено"
  };

  priorityTranslate: any = {
    "Low": "низкий",
    "Medium": "средний",
    "High": "высокий"
  }

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private kanbanService: KanbanService
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadColumns();
  }

  loadColumns(): void {
    this.kanbanService.getColumns().subscribe(columns => {
      this.columns = columns.map(col => ({
        ...col,
        tasks: []
      }));
      this.connectedLists = this.columns.map(col => col.id.toString());
    });

    this.loadTasks();
  }


  loadTasks(): void {
    this.columns.forEach(col => col.tasks = []);

    this.kanbanService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      tasks.forEach(task => {
        const column = this.columns.find(col => col.id === task.column.id);
        if (column) {
          column.tasks.push(task);
        } else {
          console.error(`Колонка с ID ${task.columnId} не найдена для задачи ${task.id}`);
        }
      });

      this.allTasks = this.columns.flatMap(col => col.tasks);
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.columns.length > 0) {
        const firstColumnId = this.columns[0].id;

        const taskData = {
          ...result,
          projectId: this.projectId,
          columnId: firstColumnId,
          created_at: new Date().toISOString(),
          isCompleted: false,
        };

        this.kanbanService.createTask(taskData).subscribe(newTask => {
          const firstColumn = this.columns.find(col => col.id === firstColumnId);
          if (firstColumn) firstColumn.tasks.push(newTask);
          this.loadTasks();
        });
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>, newColumnId: number): void {
    if (localStorage.getItem('role') !== 'admin' && this.restrictedColumns == newColumnId) {
      console.warn('У вас нет прав перемещать задачи в эту колонку');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.columnId = newColumnId;

      this.kanbanService.updateTask(task.id, { columnId: newColumnId }).subscribe(updatedTask => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      });
    }
  }

  openTaskDetailDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '900px',
      data: task
    });

    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask || updatedTask == 'deleted') {
        this.loadTasks();
      }
    });
  }

  isOverdue(dueDate: string): boolean {
    return moment(dueDate).isBefore(moment(), 'day');
  }

  getOverdueDays(dueDate: string): number {
    return moment().diff(moment(dueDate), 'days');
  }

  getDaysText(days: number): string {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
    return 'дней';
  }
  protected readonly localStorage = localStorage;
}
