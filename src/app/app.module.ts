import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routes";

import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";

import { TimesheetModule } from "./modules/timesheet/timesheet.module";
import { ExpenseModule } from "./modules/expense/expense.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { HttpClientModule } from "@angular/common/http";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { SharedModuleModule } from "./shared/modules/shared-module/shared-module.module";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    TimesheetModule,
    ExpenseModule,
    NotificationModule,
    HttpClientModule,
    DashboardModule,
    SharedModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
