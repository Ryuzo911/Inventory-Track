import { useEditCategory } from "@/hooks/useCategory";
import { Category } from "@/utils/types/category";
import { FC, useEffect, useState } from "react";
import { Alert } from "react-native";
import BottomSheet from "../BottomSheet";
import Wrapper from "../Wrapper";
import Input from "../Input";
import Button from "../Button";

type EditCategorySheetProps = {
    visible: boolean;
    onRequestClose: () => void;
    category: Category | null;
};

const EditCategorySheet: FC<EditCategorySheetProps> = ({visible, onRequestClose, category}) => {
    const editCategory = useEditCategory();
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (category) setName(category.name);
    }, [category]);

    const handleSave = () => {
        if (!name.trim()) {
            return Alert.alert("Nama kategori tidak boleh kosong.");
        }
        if (!category?.id) {
            return Alert.alert("Kategori tidak valid.");
        }

        editCategory.mutate(
            {id: category.id, name: name.trim()},
            {
                onSuccess: () => {
                    Alert.alert("Berhasil", "Kategori berhasil diperbarui.");
                    setName("");
                    onRequestClose();
                },
                onError: (error) => {
                    Alert.alert("Gagal", error.message || "Terjadi kesalahan saat memperbarui kategori.");
                },
            }
        );
    };

    const disableSave = !name.trim() || editCategory.isPending;

    return (
        <BottomSheet title="Edit Kategori" visible={visible} onRequestClose={onRequestClose}>
            <Wrapper padding={16} gap={12}>
                <Input label="Nama Kategori" placeholder="Masukkan Nama Kategori" value={name} onChangeText={setName}/>
                <Button label={editCategory.isPending ? "Menyimpan" : "Simpan"} onPress={handleSave} disabled={disableSave}/>
            </Wrapper>
        </BottomSheet>
    );
};

export default EditCategorySheet;