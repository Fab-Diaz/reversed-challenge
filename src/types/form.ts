export type Sort = 'created' | 'updated' | 'comment'
export type PageSize = 15 | 30 | 50 | 100

export type FormType = {
  org: string,
  repo: string,
  sort: Sort
  pageSize: PageSize
}