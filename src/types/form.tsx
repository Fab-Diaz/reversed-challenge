export type Form = {
  org: string,
  repo: string,
}

export type FormErrors = Form & {
  api?: string | null,
}