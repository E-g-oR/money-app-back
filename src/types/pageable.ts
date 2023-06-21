export interface PageableMeta {
  page: number;
  limit: number;
  pageCount: number;
  count: number;
}

export interface Pageable<D> {
  data: ReadonlyArray<D>;
  meta: PageableMeta;
}
