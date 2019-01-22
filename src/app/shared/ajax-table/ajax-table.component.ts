import {
  Component,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  ContentChildren,
  QueryList,
  ViewChild,
  Input,
  Output,
  TemplateRef,
  ContentChild
} from "@angular/core";

import { Subscription, BehaviorSubject } from "rxjs";
import {
  MatHeaderRowDef,
  MatRowDef,
  MatColumnDef,
  MatTable,
  MatPaginator,
  MatSort,
  PageEvent,
  Sort
} from "@angular/material";
import { IPageInformation, ISortInformation } from "./tableQuery.model";

@Component({
  selector: "app-ajax-table",
  templateUrl: "./ajax-table.component.html",
  styleUrls: ["./ajax-table.component.css"]
})
export class AjaxTableComponent
  implements AfterContentInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input()
  isLoading?: boolean;

  @Input()
  tableColumns: Array<string>;

  @Input()
  data: Array<any>;

  @Input()
  totalRecords: number;

  @Input()
  headerTemplate?: TemplateRef<any>;

  @Output()
  page: BehaviorSubject<IPageInformation>;

  @Output()
  sort: BehaviorSubject<ISortInformation>;

  @ViewChild(MatTable) table: MatTable<any>;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild(MatSort) matSort: MatSort;

  constructor() {}

  ngAfterViewInit() {
    const { pageIndex, pageSize } = this.paginator;
    this.page = new BehaviorSubject<IPageInformation>({
      pageIndex,
      pageSize
    });
    this.sort = new BehaviorSubject<ISortInformation>({
      sortBy: this.matSort.active,
      direction: this.matSort.direction
    });
  }

  ngAfterContentInit() {
    this._addTableMetaData();
    this._requestDataOnTableQuery();
  }

  /**
   * @description Iterate through subscription list and unsubscripe to prevent
   * memory leaks
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * @description Read through row and column defs from parent (passed through ng-props)
   * and add to table
   */
  private _addTableMetaData() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef =>
      this.table.addHeaderRowDef(headerRowDef)
    );
  }

  /**
   * @description setup subscriptions to inform parent component of page or sort event
   */
  private _requestDataOnTableQuery() {
    let subscription = this.paginator.page.subscribe((e: PageEvent) => {
      const { pageIndex, pageSize } = e;
      this.page.next({ pageIndex: pageIndex + 1, pageSize });
    });

    this.subscriptions.push(subscription);

    subscription = this.matSort.sortChange.subscribe((e: Sort) => {
      this.sort.next({ sortBy: e.active, direction: e.direction });
    });

    this.subscriptions.push(subscription);
  }
}
