import { useGetCategory } from "@/hooks/useCategory";
import { useEditProduct } from "@/hooks/useProduct";
import { useState, FC } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Input from "../Input";
import Select from "../Select";
import ImageSelector from "../ImageSelector";
import Button from "../Button";
import BottomSheet from "../BottomSheet";
import FormGroup from "../FormGroup";
import IconButton from "../IconButton";
import ErrorMessage from "../ErrorMessage";
import api from "@/utils/apis";

type EditProductProps = {
  product: any; 
};

const EditProduct: FC<EditProductProps> = ({ product }) => {
  const [values, setValues] = useState<any>({
    id: product?.id,
    name: product?.name ?? "",
    stock: product?.stock?.toString() ?? "0",
    category_id: product?.category_id ?? undefined,
    image: product?.image_url ?? null,
  });
  const [show, setShow] = useState<boolean>(false);

  const { data: categories } = useGetCategory();
  const editProduct = useEditProduct();

  const handleSave = () => {
    const payload: any = {
      id: values.id,
      name: values.name,
      stock: parseInt(values.stock) || 0,
      category_id: Number(values.category_id) || 0,
      image: values.image ?? null,
    };

    editProduct.mutate(payload, {
      onSuccess: () => {
        Alert.alert("Sukses", "Produk berhasil diupdate 🎉");
        setShow(false);
      },
      onError: (err: any) => {
        console.error("Error update:", err);
        Alert.alert("Error", "Gagal mengupdate produk ❌");
      },
    });
  };

  console.log("values", values);

  return (
    <GestureHandlerRootView>
      <IconButton
        color="primary"
        size="small"
        icon="pencil"
        onPress={() => setShow(true)}
      />

      <BottomSheet
        title="Edit Produk"
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <FormGroup>
          <Input
            label="Nama Produk"
            value={values.name}
            onChangeText={(text) => setValues({ ...values, name: text })}
          />
          <Input
            label="Stok Produk"
            keyboardType="numeric"
            value={values.stock}
            onChangeText={(text) => setValues({ ...values, stock: text })}
          />
          <Select
            withReset={false}
            label="Kategori"
            value={values.category_id?.toString()}
            options={
              categories?.map((cat: any) => ({
                label: cat.name,
                value: cat.id.toString(),
              })) || []
            }
            onChange={(id) => setValues({ ...values, category_id: parseInt(id) })}
          />
          <ImageSelector
            label="Gambar Produk"
            value={values.image ?? ""}
            onChange={(img) => setValues({ ...values, image: img })}
          />
        </FormGroup>

        {editProduct.error && (
          <ErrorMessage
            message={(editProduct.error as any)?.message || "Terjadi kesalahan"}
          />
        )}

        <Button
          label={editProduct.isPending ? "Menyimpan..." : "Simpan perubahan"}
          icon="check"
          loading={editProduct.isPending}
          onPress={handleSave}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default EditProduct;
