import api from ".";
import { Product } from "../types/product";


const apiProduct = {

    getProduct: async (): Promise<Product[]> => {
        const {data} = await api.get("/product")
        return data;
    },
    postProduct: async (payload: Omit<Product, "id">): Promise<Product> => {
        const {data} = await api.post("/product")
        return data;
    },
    putProduct: async (user: Product) => {
        const {id, ...other} = user;
        return await api.put(`/product/${id}`, other);
    },

    deleteProduct: async (id: Product["id"]) => {
        return await api.delete(`/product/${id}`)
    },
};

export default apiProduct;