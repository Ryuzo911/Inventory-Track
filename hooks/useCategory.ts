import apiCategory from "@/utils/apis/apiCategory";
import { Category } from "@/utils/types/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: async () => await apiCategory.getCategory(),
  });
};

export const useShowCategory = (id: Category["id"]) => {
  return useQuery<Category>({
    queryKey: ["category", id],
    queryFn: async () => await apiCategory.getCategoryById(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Category, "id">) => {
      return await apiCategory.postCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Category) => {
      return await apiCategory.putCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Category["id"]) => {
      return await apiCategory.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};