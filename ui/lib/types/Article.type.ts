export interface IArticleDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  seen: number;
  is_active: boolean;
  is_deleted: boolean;
  comments?: IProductCommentDto[];
}

export interface IProductCommentDto {
  id: string;
  name: string;
  email: string;
  message: string;
  is_active: boolean;
  is_deleted: boolean;
}
