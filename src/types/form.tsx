export type Sort = 'created' | 'updated' | 'comment'
export type PageSize = 5 | 15 | 30 | 50 | 100

export type Form = {
  org: string,
  repo: string,
  sort: Sort
  pageSize: PageSize
}

export type FormErrors = {
  org: string,
  repo: string,
  api?: string | null,
}