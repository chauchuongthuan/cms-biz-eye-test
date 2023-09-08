export interface IPost {
  id: string
  author: any
  lastEditor: any
  feature: boolean
  postCategory: any
  tags: any
  assigned: any
  tagNames: any
  image: string
  imageMb: string
  title: string
  slug: string
  shortDescription: string
  content: string
  status: string
  statusText: boolean
  publishedAt: any
  sortOrder: number
  readTime: string
  metaTitle: string
  metaImage: any
  metaDescription: string
  metaKeyword: string
  createdAt: string
}

export interface IComment {
  id: string
  author: any
  post: any
  content: string
  createdAt: string
}
