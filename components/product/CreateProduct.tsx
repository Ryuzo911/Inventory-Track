import React, { FC, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../BottomSheet";
import Wrapper from "../Wrapper";
import Input from "../Input";
import ImageSelector from "../ImageSelector";
import Button from "../Button";
import { useGetCategory } from "@/hooks/useCategory";
import { useCreateProduct } from "@/hooks/useProduct";
import { CreateProductPayload } from "@/utils/types/product";
import SelectCategory from "../category/SelectCategory";
import CreateCategorySheet from "../category/CreateCategory";

type CreateProductSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
};

const CreateProductSheet: FC<CreateProductSheetProps> = ({ visible, onRequestClose }) => {
  const { data: categories, refetch: refetchCategories } = useGetCategory();
  const createProduct = useCreateProduct();

  const [name, setName] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [image, setImage] = useState<string | null>(null);

  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const categoryOptions = (categories || []).map((c: any) => ({
    label: c.name,
    value: String(c.id),
  }));

  const optionsWithCreate = [
    ...categoryOptions,
    { label: " Tambah Kategori", value: "__create" },
  ];

  const resetForm = () => {
    setName("");
    setStock(0);
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
      stock: stock || 0,
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

  const handleCategoryChange = (id?: string | number) => {
    if (id === undefined || id === "" || id === null){
      setCategoryId(undefined);
      return;
    }

    const parsedId = typeof id === "string" ? parseInt(id, 10) : Number(id);
    setCategoryId(Number.isNaN(parsedId) ? undefined : parsedId);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet title="Tambah Produk" visible={visible} onRequestClose={onRequestClose}>
        <Wrapper padding={16} gap={12}>
          <Input
            label="Nama Produk"
            placeholder="Contoh: Kopi Arabika"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Stok Produk"
            keyboardType="numeric"
            value={String(stock)}
            onChangeText={(t) => setStock(parseInt(t) || 0)}
          />

          <SelectCategory
            label="Kategori"
            placeholder="Pilih kategori"
            value={categoryId }
            options={optionsWithCreate}
            onChange={handleCategoryChange}
          />

          <ImageSelector label="Pilih Gambar (opsional dan pastikan format gambar jpg atau jpeg)" value={image || ""} onChange={setImage} />

          <Button
            label={createProduct.isPending ? "Menyimpan..." : "Simpan Produk"}
            onPress={handleSave}
            disabled={saveDisabled}
          />
        </Wrapper>
      </BottomSheet>
      <CreateCategorySheet
        visible={showCreateCategory}
        onRequestClose={() => setShowCreateCategory(false)}
      />
    </GestureHandlerRootView>
  );
};

export default CreateProductSheet;
