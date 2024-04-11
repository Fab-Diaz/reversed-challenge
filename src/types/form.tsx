export type Sort = 'created' | 'updated' | 'comment'

export type Form = {
  org: string,
  repo: string,
  sort: Sort
}

export type FormErrors = {
  org: string,
  repo: string,
  api?: string | null,
}