export interface ArticleAuthor {
  name: string;
}

export interface Article {
  _id: string;
  title: string;
  imageUrl: string;
  author?: ArticleAuthor;
  companyName?: string;
  description: string;
  createdAt: string;
}

export interface ArticlesProps {
  data: Article[];
}

export interface BlogCardProps {
  id: string;
  link: string;
  Title: string;
  imagesrc: string;
  author: string;
  company: string;
  description: string;
  readingTime?: number;
  date: string;
}
