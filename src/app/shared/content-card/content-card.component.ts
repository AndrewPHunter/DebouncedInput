import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-content-card",
  templateUrl: "./content-card.component.html",
  styleUrls: ["./content-card.component.css"],
  styles: [
    `
      :host {
        flex: 1 1 100%;
      }
    `
  ]
})
export class ContentCardComponent {
  @Input()
  cardContent: TemplateRef<any>;

  @Input()
  title?: string;
  constructor() {}
}
