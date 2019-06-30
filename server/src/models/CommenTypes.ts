export interface ISearchResult<T> {
  errors: string[];
  data: T[];
  count: number;
}