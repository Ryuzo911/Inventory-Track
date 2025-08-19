import api from ".";
import { Transaction } from "../types/transaction";

const apiTransaction = {
    getTransaction: async (): Promise<Transaction[]> => {
        const {data} = await api.get("/transaction")
        return data;
    },
    postTransaction: async (payload: Omit<Transaction, "id">): Promise<Transaction> => {
        const {data} = await api.post("/transaction")
        return data;
    },
    putTransaction: async (user: Transaction) => {
        const {id, ...other} = user;
        return await api.put(`/transaction/${id}`, other);
    },

    deleteTransaction: async (id: Transaction["id"]) => {
        return await api.delete(`/transaction/${id}`)
    },
};

export default apiTransaction;
