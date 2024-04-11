type User = {
  avatar_url: string,
  html_url: string,
}

type Issue = {
  title: string,
  body: string,
  user: User,
  comments: number,
  comments_url: string,
  created_at: string,
  updated_at: string,
  html_url: string,
  state: string,
  locked: boolean,
}

export default Issue