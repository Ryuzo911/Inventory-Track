import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import api from ".";
import { Alert } from "react-native";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

   const fetchUsers = async () => {
    setLoading(true);
    try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data pengguna");
    } finally {
        setLoading(false);
    }
   };

   const createUser = async (form: {
        name: string;
        email: string;
        password: string;
        role: string;
   }) => {
    if (!form.name || !form.email || !form.password || !form.role) {
        Alert.alert("Error", "Semua field harus diisi");
        return;
    }

    try {
        setLoading(true)
        await api.post('/admin/users', form);
        Alert.alert("Success", "Pengguna berhasil ditambahkan");
        fetchUsers();
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        Alert.alert("Error", "Terjadi kesalahan saat menambahkan pengguna");
    } finally {
        setLoading(false);
    }
   };

   const updateUser = async (id: number, data: Partial<Omit<User, "id">> & {password: string}) => {
    try {
        setLoading(true)
        await api.put(`/admin/users/${id}`, data);
        Alert.alert("Success", "Pengguna berhasil diperbarui");
        fetchUsers();
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        Alert.alert("Error", "Terjadi kesalahan saat memperbarui pengguna");
    } finally {
        setLoading(false);
    }
   };

   const deleteUser = async (id: number) => {
    Alert.alert("Konfirmasi", "Anda yakin ingin menghapus pengguna ini?", [
        {
            text: "Tidak",
            style: "cancel"
        },
        {
            text: "Ya",
            onPress: async () => {
                try {
                    await api.delete(`/admin/users/${id}`);
                    fetchUsers();
                } catch (err: any) {
                    console.error(err.response?.data || err.message);
                    Alert.alert("Error", "Terjadi kesalahan saat menghapus pengguna");
                }
            },
        },
    ]);
   };

   useEffect(() => {
    fetchUsers()
   }, []);

    return {
        users,
        loading,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser
    };
};