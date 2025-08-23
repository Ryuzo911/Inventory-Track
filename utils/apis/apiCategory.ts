import api from ".";
import { Category } from "../types/category";

const apiCategory = {
    getCategory: async (): Promise<Category[]> => {
        const {data} = await api.get("/category")
        return data;
    },

    getCategoryById: async (id: Category["id"]): Promise<Category> => {
        const {data} = await api.get(`/category/${id}`)
        return data;
    },
    postCategory: async (payload: Omit<Category, "id">): Promise<Category> => {
        const {data} = await api.post("/category")
        return data;
    },
    putCategory: async (user: Category) => {
        const {id, ...other} = user;
        return await api.put(`/category/${id}`, other);
    },

    deleteCategory: async (id: Category["id"]) => {
        return await api.delete(`/category/${id}`)
    },
};

export default apiCategory;