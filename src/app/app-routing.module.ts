import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditCraComponent } from './cras/edit-cra/edit-cra.component';
import { CrasComponent } from './cras/cras.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'cra',
    component: CrasComponent,
    children:
    [
      { path: 'edit', component: EditCraComponent, },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
