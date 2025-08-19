import apiTransaction from "@/utils/apis/apiTransaction";
import { Transaction } from "@/utils/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTransaction = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transaction"],
    queryFn: async () => await apiTransaction.getTransaction(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Transaction, "id">) => {
      return await apiTransaction.postTransaction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Transaction) => {
      return await apiTransaction.putTransaction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Transaction["id"]) => {
      return await apiTransaction.deleteTransaction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};
