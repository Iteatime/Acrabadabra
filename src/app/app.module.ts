import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {NgbModule as NgBootstrap} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CrasComponent } from './cras/cras.component';
import { EditCraComponent } from './cras/edit-cra/edit-cra.component';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CrasComponent,
    EditCraComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgBootstrap,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
