export interface Category {
    name: string;
}

export interface CategoryWithKey {
    $key: string;
    category: Category;
}