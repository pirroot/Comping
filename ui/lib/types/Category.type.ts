export interface CategoryType {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: string | null;
}
