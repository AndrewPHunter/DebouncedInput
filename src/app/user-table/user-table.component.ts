import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterContentInit
} from "@angular/core";
import { IUser } from "../shared/models/user.model";
import { Subscription } from "rxjs";
import { UserService } from "../core/services/user.service";
import { AjaxTableComponent } from "../shared/ajax-table/ajax-table.component";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.css"]
})
export class UserTableComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  tableColumns = ["id", "name", "email", "favoriteSport"];
  data: Array<IUser> = [];
  totalCount = 0;

  private _subscriptions: Subscription[] = [];

  constructor(private _userService: UserService) {}

  @ViewChild("table") table: AjaxTableComponent;

  ngOnInit() {
    this._subscribeToDataChanges();
  }

  ngAfterViewInit() {
    this._subscribeToTableEvents();
  }

  ngAfterContentInit() {
    this.table.isLoading = true;
  }
  private _subscribeToTableEvents() {
    let subscription = this.table.page.subscribe(info => {
      const { sortBy, direction } = this.table.sort.getValue();
      this._fetchData(info.pageIndex, info.pageSize, sortBy, direction);
    });

    this._subscriptions.push(subscription);

    subscription = this.table.sort.subscribe(info => {
      const { pageIndex, pageSize } = this.table.page.getValue();
      this._fetchData(pageIndex, pageSize, info.sortBy, info.direction);
    });
  }
  private _subscribeToDataChanges() {
    const subscription = this._userService.userData.subscribe(data => {
      this.data = data;
      this.totalCount = this._userService.totalCount;
      this.table.isLoading = false;
    });

    this._subscriptions.push(subscription);
  }

  private _fetchData(
    page: number,
    pageSize: number,
    sortBy?: string,
    sortOrder?: string,
    filterFor?: string,
    filterBy?: string
  ) {
    this.table.isLoading = true;
    this._userService.fetchUserData(
      page,
      pageSize,
      sortBy,
      sortOrder,
      filterFor,
      filterBy
    );
  }
}
