import React, { FC, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../BottomSheet";
import Wrapper from "../Wrapper";
import Text from "../Text";
import Input from "../Input";
import Select from "../Select";
import ImageSelector from "../ImageSelector";
import Button from "../Button";
import Badge from "../Badge";
import { useGetCategory } from "@/hooks/useCategory";
import { useCreateProduct } from "@/hooks/useProduct";
import { CreateProductPayload } from "@/utils/types/product";

type CreateProductSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
};

const CreateProductSheet: FC<CreateProductSheetProps> = ({ visible, onRequestClose }) => {
  const { data: categories } = useGetCategory();
  const createProduct = useCreateProduct();

  const [name, setName] = useState<string>("");
  const [stock, setStock] = useState<string>("0");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [image, setImage] = useState<string | null>(null);

  const categoryOptions = (categories || []).map((c: any) => ({
    label: c.name,
    value: String(c.id),
  }));

  const resetForm = () => {
    setName("");
    setStock("0");
    setCategoryId(undefined);
    setImage(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      return Alert.alert("Nama produk wajib diisi");
    }
    if (!categoryId) {
      return Alert.alert("Pilih kategori produk");
    }
    const payload: CreateProductPayload = {
      name: name.trim(),
      stock: parseInt(stock) || 0,
      category_id: Number(categoryId),
      image,
    };

    createProduct.mutate(payload, {
      onSuccess: () => {
        Alert.alert("Sukses", "Produk berhasil dibuat");
        resetForm();
        onRequestClose();
      },
      onError: (err: any) => {
        console.error("Error create product:", err);
        const msg = err?.response?.data?.message || err?.message || "Gagal membuat produk";
        Alert.alert("Gagal", msg);
      },
    });
  };

  const saveDisabled = createProduct.isPending || !name.trim() || !categoryId;

  return (
  
      <BottomSheet title="Tambah Produk" visible={visible} onRequestClose={onRequestClose}>
        <Wrapper padding={16} gap={12}>
          <Text variant="title">Tambah Produk</Text>

          <Input
            label="Nama Produk"
            placeholder="Contoh: Kopi Arabika"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Stok Produk"
            keyboardType="numeric"
            value={stock}
            onChangeText={(t) => {
              const cleaned = t.replace(/[^0-9]/g, "");
              setStock(cleaned);
            }}
          />

          <Select
            label="Kategori"
            placeholder="Pilih kategori"
            value={categoryId ? String(categoryId) : ""}
            options={categoryOptions}
            onChange={(val) => setCategoryId(parseInt(val) || undefined)}
          />

          <ImageSelector label="Pilih Gambar (opsional)" value={image || ""} onChange={setImage} />

          <Button
            label={createProduct.isPending ? "Menyimpan..." : "Simpan Produk"}
            onPress={handleSave}
            disabled={saveDisabled}
          />
        </Wrapper>
      </BottomSheet>
    
  );
};

export default CreateProductSheet;
