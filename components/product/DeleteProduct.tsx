import React, { FC, useState } from "react";
import { Alert } from "react-native";
import { useDeleteProduct } from "../../hooks/useProduct";
import Button from "../Button";
import Popup from "../Popup";
import { Product } from "../../utils/types/product";
import IconButton from "../IconButton";
import { router } from "expo-router";

type DeleteProductProps = {
  product: Product;
};

const DeleteProduct: FC<DeleteProductProps> = ({ product }) => {
  const [show, setShow] = useState<boolean>(false);
  const { mutateAsync, isPending, error } = useDeleteProduct();

  const handleDelete = () => {
    mutateAsync(product.id)
      .then(() => {
        setShow(false);
        Alert.alert("Sukses", `Produk "${product.name}" telah dihapus.`);
        console.log("Produk dihapus:", product.id);
      })
      .then(() => router.back())
      .catch((e) => {
        console.error("Gagal menghapus produk:", e.message);
      });
  };

  return (
    <>
      <IconButton
        icon="trash"
        size="small"
        color="primary"
        onPress={() => setShow(true)}
      />
      <Popup
        title="Hapus Produk"
        message={`Yakin ingin menghapus produk "${product.name}"?`}
        visible={show}
        onRequestClose={() => setShow(false)}
        loading={isPending}
        error={error?.message}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteProduct;