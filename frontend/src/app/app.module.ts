import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import {MatListModule} from "@angular/material/list";
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { AdminComponent } from './components/admin/admin.component';
import {MatTableModule} from "@angular/material/table";
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { TaskDetailDialogComponent } from './components/task-detail-dialog/task-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjectDialogComponent,
    UserDialogComponent,
    AdminComponent,
    EditUserComponent,
    ProjectPageComponent,
    TaskDialogComponent,
    TaskDetailDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        MatListModule,
        MatTableModule,
        DragDropModule,
        MatSelectModule,
        MatDatepickerModule,
      MatNativeDateModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
