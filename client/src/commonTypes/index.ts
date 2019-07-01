export interface IResponseError {
  err: string;
  data: null;
}

export interface IResponseData<T> {
  err: "";
  data: T;
}

export interface IResponsePageData<T> {
  err: "";
  data: T[];
  total: number;
}

/**
 * 查询条件
 */
export interface ISearchCondition {
  key?: string
  nowPage?: number
  pageSize?: number
}