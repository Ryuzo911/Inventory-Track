export type Product = {
    id?: number,
    name: string,
    stock: number,
    category_id: number,
    category?: string
    image_url?: string | null,
};

export type CreateProductPayload = {
    name: string;
    stock: number;
    category_id: number;
    image?: any;
};

export type EditProductPayload = {
    id: number;
    name: string;
    stock: number;
    category_id: number;
    image?: string | null;
}