import apiProduct from "@/utils/apis/apiProduct";
import { Product } from "@/utils/types/product";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Product, "id">) => {
      return await apiProduct.postProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Product) => {
      return await apiProduct.putProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
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
