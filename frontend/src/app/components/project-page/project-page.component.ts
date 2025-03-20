import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {KanbanService} from "../../kanban.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {ActivatedRoute} from "@angular/router";

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

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectId: number = 0;
  columns: any[] = [];
  connectedLists: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private kanbanService: KanbanService
  ) {}

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadColumns();
  }

  loadColumns() {
    this.kanbanService.getColumns().subscribe(columns => {
      this.columns = columns;

      this.connectedLists = this.columns.map(col => col.id.toString());
    });
  }

  openTaskDialog() {
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
        });
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>, columnId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
