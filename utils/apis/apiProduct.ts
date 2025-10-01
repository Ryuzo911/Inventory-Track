import api from ".";
import { CreateProductPayload, Product } from "../types/product";
import * as SecureStore from "expo-secure-store";


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

  uploadProductFetch: async (id: number, fd: FormData) => {
    const token = await SecureStore.getItemAsync("token");

    const res = await fetch(`http://192.168.1.51:8000/api/product/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(`HTTP error! status: ${res.status}, message: ${JSON.stringify(json)}`);
    }
    return res.json();
  },

  putProduct: (id: number, payload: any) => {
    return api.put(`/product/${id}`, payload, {
      headers: {
        Accept: "application/json",
      }
    })
  },

    deleteProduct: async (id: Product["id"]) => {
        return await api.delete(`/product/${id}`)
    },
};

export default apiProduct;