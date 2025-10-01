import api from "@/utils/apis";
import apiProduct from "@/utils/apis/apiProduct";
import { CreateProductPayload, EditProductPayload, Product } from "@/utils/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageComponent } from "react-native";

export const useGetProduct = () => {
  return useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: async () => await apiProduct.getProduct(),
  });
};

export const useShowProduct = (id: Product["id"]) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => await apiProduct.getProductById(id),
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, any, CreateProductPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("stock", String(payload.stock));
      formData.append("category_id", String(payload.category_id));

      if (payload.image) {
        formData.append("image", {
          uri: payload.image, 
          name: "product.jpg",
          type: "image/jpeg",
        } as any);
      }

      const res = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data as Product;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useEditProduct = () => {
  const isLocalFile = (s?: string | null) =>
  !!s && (s.startsWith("file://") || s.startsWith("content://"));

   const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditProductPayload) => {
      const {id, image, ...rest} = payload;

      if (isLocalFile(image)) {
        const form = new FormData();
        form.append("_method", "PUT");
        Object.entries(rest).forEach(([k, v]) => {
          if (v !== undefined && v !== null) form.append(k, String(v));
        });

        const ext = (image!.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "");
        const mimeType = ext.toLowerCase().includes("jpg" ) ? "image/jpeg" : `image/${ext}`;

        form.append("image", {
          uri: image,
          name: `product_${Date.now()}.${ext}`,
          type: mimeType,
        } as any);

        const res = await apiProduct.uploadProductFetch(id, form);
        return res;
      }

      const jsonPayload: any = {...rest};
      if (image) {jsonPayload.image = image;}

      const res = await apiProduct.putProduct(id, jsonPayload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product"] });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Product["id"]) => {
      return await apiProduct.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
