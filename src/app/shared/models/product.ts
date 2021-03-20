export interface Product {
    title?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
}

export interface ProductWithKey {
    $key?: string;
    title?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
}