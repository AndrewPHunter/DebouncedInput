import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { UserTableComponent } from "./user-table/user-table.component";

@NgModule({
  declarations: [AppComponent, UserTableComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, CoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
