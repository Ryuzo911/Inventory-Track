import apiTransaction from "@/utils/apis/apiTransaction";
import { Transaction } from "@/utils/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTransaction = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transaction"],
    queryFn: async () => await apiTransaction.getTransaction(),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await apiTransaction.postTransaction(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useEditTransaction = () => {
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

export const useDeleteTransaction = () => {
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
