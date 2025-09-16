export type enumType = 'in' | 'out';

export type Transaction = {
    id: number;
    product_id: number;
    type: enumType;
    quantity: number;
    created_by: number;
    note?: string;
}