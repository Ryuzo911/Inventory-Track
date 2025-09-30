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
import * as SecureStore from 'expo-secure-store';
import api from "@/utils/apis";
import SelectCategory from "../category/SelectCategory";

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
      name: (values.name || "").trim(),
      stock: parseInt(values.stock, 10) || 0,
      category_id: Number(values.category_id) || 0,
      image: values.image ?? null,
    };

    console.log("Edit payload:", { ...payload, image: payload.image?.toString?.().slice?.(0, 60) });

    editProduct.mutate(payload, {
      onSuccess: (res) => {
        Alert.alert("Sukses", "Produk berhasil diupdate");
        console.log("Update success:", res);
        setShow(false);
      },
      onError: (err: any) => {
        console.error("Error update:", err, err?.status);
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.errors ||
          err?.message ||
          "Gagal mengupdate produk";
        Alert.alert("Error", JSON.stringify(message), );
      },
    });
  };

//   const testUploadFetch = async (id: number, imageUri: string) => {
//   try {
//     const fd = new FormData();
//     fd.append("_method", "PUT");
//     fd.append("name", "Air");
//     fd.append("stock", "1");
//     fd.append("image", {
//       uri: imageUri,
//       name: `test_${Date.now()}.jpg`,
//       type: "image/jpeg",
//     } as any);

//     const res = await fetch(`http://10.225.155.168:8000/api/product/${id}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`
//       },
//       body: fd,
//     });

//     const json = await res.json();
//     console.log("FETCH UPLOAD status:", res.status, json);
//   } catch (e:any) {
//     console.error("FETCH UPLOAD ERR:", e.message);
//   }
// };

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
          <SelectCategory
            withReset={false}
            label="Kategori"
            value={values.category_id?.toString() ?? ""}
            options={
              categories?.map((cat: any) => ({
                label: cat.name,
                value: cat.id.toString(),
              })) || []
            }
            onChange={(id) => setValues({ ...values, category_id: parseInt(String(id)) })}
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
