export interface IPageInformation {
  pageIndex: number;
  pageSize: number;
}

export interface ISortInformation {
  sortBy: string;
  direction: "asc" | "desc" | "";
}
