import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IUser } from "src/app/shared/models/user.model";
import { BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";
import { PagedResponse } from "src/app/shared/models/paged-response.model";

@Injectable()
export class UserService {
  // Used to simulate network latency
  private _delay = 500;

  private _url = "http://localhost:4201/users";
  private _userData: Array<IUser> = [];
  private _userSubject = new BehaviorSubject<IUser[]>(this._userData.slice());
  private _totalCount = 0;

  public userData = this._userSubject.asObservable();
  public get totalCount() {
    return this._totalCount;
  }

  constructor(private _http: HttpClient) {}

  fetchUserData(
    page = 1,
    pageSize = 10,
    sortBy = "",
    sortOrder = "",
    filterFor = "",
    filterBy = ""
  ) {
    const params = this._makeSearchParams(
      page,
      pageSize,
      sortBy,
      sortOrder,
      filterBy,
      filterFor
    );

    this._http
      .get<PagedResponse<IUser>>(this._url, { params })
      .pipe(delay(this._delay))
      .subscribe(data => {
        this._userData = data.results;
        this._totalCount = data.totalCount;
        this._userSubject.next(this._userData.slice());
      });
  }

  /**
   * @description helper method to build query parameters
   * @param page current page number
   * @param pageSize the number of elements to return per page
   * @param sortBy the property of the resource to sort by
   * @param sortOrder sort by "asc" or "desc"
   * @param filterBy the property to filter by
   * @param filterValue the value to filter for
   */
  private _makeSearchParams(
    page: number,
    pageSize: number,
    sortBy: string = null,
    sortOrder: string = null,
    filterBy: string = null,
    filterValue: string = null
  ): HttpParams {
    let params = new HttpParams();

    if (this._paramExists(filterBy) && this._paramExists(filterValue)) {
      params = params.set(`${filterBy}_like`, filterValue);
    }

    if (this._paramExists(sortBy) && this._paramExists(sortOrder)) {
      params = params
        .set("_sort", sortBy)
        .set("_order", sortOrder.toUpperCase());
    }

    params = params
      .set("_page", page.toString())
      .set("_limit", pageSize.toString());

    return params;
  }

  /**
   * @description helper method to contain javascript isNullOrEmpty
   * @param param the string to check
   */
  private _paramExists(param: string) {
    return param && param.length > 0;
  }
}
