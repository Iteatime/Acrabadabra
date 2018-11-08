import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CrasComponent } from './cras/cras.component';
import { EditCraComponent } from './cras/edit-cra/edit-cra.component';

import { HomeComponent } from './home/home.component';

import { ModalDirective } from './shared/style/modal.directive';

@NgModule({
  declarations: [
    AppComponent,
    CrasComponent,
    EditCraComponent,
    HomeComponent,
    ModalDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
