import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../material/material.module";
import { ContentCardComponent } from "./content-card/content-card.component";
import { AjaxTableComponent } from "./ajax-table/ajax-table.component";

@NgModule({
  declarations: [ContentCardComponent, AjaxTableComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [
    CommonModule,
    AjaxTableComponent,
    ContentCardComponent,
    HttpClientModule,
    MaterialModule
  ]
})
export class SharedModule {}
