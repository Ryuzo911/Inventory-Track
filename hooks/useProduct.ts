import api from "@/utils/apis";
import apiProduct from "@/utils/apis/apiProduct";
import { CreateProductPayload, EditProductPayload, Product } from "@/utils/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditProductPayload) => {
      const { id, image, ...rest } = payload;

      // If image is local file URI -> send multipart FormData
      if (image && (image.startsWith("file://") || image.startsWith("content://"))) {
        const form = new FormData();
        form.append("_method", "PUT");
        // append other fields (only defined ones)
        Object.entries(rest).forEach(([k, v]) => {
          if (v !== undefined && v !== null) form.append(k, String(v));
        });

        form.append("image", {
          uri: image,
          name: `product_${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);

        const res = await apiProduct.putProduct(id, form);
        return res.data;
      }

      // No local image -> simple JSON PUT
      const jsonPayload: any = { ...rest };
      // if image is remote url and you want to keep it, you can omit it or include as image_url depending backend
      const res = await apiProduct.putProduct(id, jsonPayload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
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
