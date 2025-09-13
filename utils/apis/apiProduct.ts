import api from ".";
import { CreateProductPayload, Product } from "../types/product";


const apiProduct = {

    getProduct: async (): Promise<Product[]> => {
        const {data} = await api.get("/product")
        return data;
    },

    getProductById: async (id: Product["id"]): Promise<Product> => {
        const {data} = await api.get(`/product/${id}`)
        return data;
    },
    postProduct: async (formData: FormData, p0: { headers: { "Content-Type": string; Accept: string; }; }, payload: CreateProductPayload): Promise<Product> => {
        const {data} = await api.post("/product", payload)
        return data;
    },

     putProduct: (id: number, payload: any) => {
       if (payload instanceof FormData) {
        return api.post(`/products/${id}`, payload, {
         headers: {
           Accept: "application/json",
        },
        });
      } else {
          return api.put(`/products/${id}`, payload, {
            headers: {
              Accept: "application/json",
            },
          });
        }
    },

    deleteProduct: async (id: Product["id"]) => {
        return await api.delete(`/product/${id}`)
    },
};

export default apiProduct;