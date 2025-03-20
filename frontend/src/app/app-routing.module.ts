import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./auth.guard";
import {AdminComponent} from "./components/admin/admin.component";
import {RoleGuard} from "./role.guard";
import {ProjectPageComponent} from "./components/project-page/project-page.component";

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard, RoleGuard] },
  { path: 'project/:id', component: ProjectPageComponent, canActivate:[AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
