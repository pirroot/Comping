export interface NavItem {
  title: string;
  link: string;
}

export interface SubCategoryGroup {
  title: string;
  items: { title: string; url: string }[];
}

export interface NavCategory {
  title: string;
  url: string;
  icon: React.ReactNode;
  image: string;
  subcategories: SubCategoryGroup[];
}
