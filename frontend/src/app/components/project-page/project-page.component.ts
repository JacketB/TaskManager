import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ProjectData} from "../../consts/ProjectData";
import {GET_ALL_COLUMNS} from "../../consts/api";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  columns: any[] = [];
  connectedLists: string[] = [];

  ngOnInit() {
    this.loadColumns();
    this.loadTasks();
  }

  loadColumns() {
    this.columns = [
      { id: 1, name: 'Opened', tasks: [] },
      { id: 2, name: 'In Work', tasks: [] },
      { id: 3, name: 'Review', tasks: [] },
      { id: 4, name: 'Done', tasks: [] }
    ];

    // Создаём массив привязанных списков для drag & drop
    this.connectedLists = this.columns.map(col => `col-${col.id}`);
  }

  loadTasks() {
    const tasksFromServer = [
      { id: 101, title: 'Fix bug #123', statusId: 1 },
      { id: 102, title: 'Refactor code', statusId: 1 },
      { id: 103, title: 'Implement feature X', statusId: 2 },
      { id: 104, title: 'Write tests', statusId: 4 }
    ];

    this.columns.forEach(column => {
      column.tasks = tasksFromServer.filter(task => task.statusId === column.id);
    });
  }

  drop(event: CdkDragDrop<any[]>, newStatusId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.statusId = newStatusId;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
