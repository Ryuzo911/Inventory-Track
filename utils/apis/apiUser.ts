import { User } from "@/utils/types/user";
import api from "@/utils/apis";
import * as SecureStore from "expo-secure-store";

export type LoginPayload = Pick<User, 'email' | 'password'>
export type RegisterPayload = Pick<User, 'name' | 'email' | 'password'>

const apiUser = {
    login: async (payload: LoginPayload) => {
        const {data} = await api.post('/login', payload)
        const token = data.token;
        await SecureStore.setItemAsync('token', token);
        return token;
    },
    register: async (payload: RegisterPayload) => {
        const {data} = await api.post('register', payload);
        const token = data.token;
        await SecureStore.setItemAsync('token', token);
        return token;
    },
    getMe: async () => {
        const {data} = await api.get('/user');
        return data;
    },
    logout: async () => {
        const{data} = await api.post('/logout');
        await SecureStore.deleteItemAsync('token');
        return data;
    }
};

export default apiUser;