import { useDeleteCategory } from "@/hooks/useCategory";
import { Category } from "@/utils/types/category";
import { FC, useState } from "react";
import { Alert } from "react-native";
import Popup from "../Popup";
import { router } from "expo-router";

type DeleteCategoryProps = {
  category: Category;
  visible: boolean;
  onRequestClose: () => void;
};

const DeleteCategory: FC<DeleteCategoryProps> = ({
  category,
  visible,
  onRequestClose,
}) => {
  const { mutateAsync, isPending, error } = useDeleteCategory();

  const handleDelete = () => {
    mutateAsync(category.id)
          .then(() => {
            Alert.alert("Sukses", `Produk "${category.name}" telah dihapus.`);
            console.log("Produk dihapus:", category.id);
          })
          .then(() => {
            onRequestClose();   
          })
          .catch((e) => {
            console.error("Gagal menghapus produk:", e.message);
          });
  };

  return (
    <Popup
      title="Hapus Kategori"
      message={`Yakin ingin menghapus kategori "${category.name}"?`}
      visible={visible}
      onRequestClose={onRequestClose}
      loading={isPending}
      error={error?.message}
      onConfirm={handleDelete}
    />
  );
};

export default DeleteCategory;
