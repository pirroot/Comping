export interface CategoryType {
  id: string;
  title: string;
  slug: string;
  image: string;
  parent?: {
    id: string;
    title: string;
    slug: string;
  };
  products: ProductType[];
  children?: CategoryType[];
  description?: string;
  parentId?: string | null;
}

export interface ProductType {
  id: string;
  id_product: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  images: string[];
  image_alt: string;
  price: number;
  is_offer: boolean;
  offer_percent?: number;
  rating: number;
  features: FeaturesType[];
  comments?: ProductCommentType[];
  category: CategoryType;
  is_active: boolean;
  is_deleted: boolean;
}

interface FeaturesType {
  id: string;
  title: string;
  value: string[];
}

export interface ProductCommentType {
  id: string;
  context: string;
  rate: number;
  is_active: boolean;
  is_deleted: boolean;
}

export interface ImageType {
  src: string;
  alt?: string;
  main: boolean;
}
