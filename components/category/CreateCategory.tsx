import { useCreateCategory } from "@/hooks/useCategory";
import { CreateCategoryPayload } from "@/utils/types/category";
import { FC, useState } from "react";
import { Alert } from "react-native";
import BottomSheet from "../BottomSheet";
import Wrapper from "../Wrapper";
import Input from "../Input";
import Button from "../Button";

type CreateCategoryProps = {
    visible: boolean;
    onRequestClose: () => void;
}

const CreateCategorySheet: FC<CreateCategoryProps> = ({ visible, onRequestClose }) => {
    const createCategory = useCreateCategory();

    const [name, setName] = useState<string>("");

    const handleSave = () => {
        if (!name.trim()) {
            return Alert.alert("Nama Category wajib diisi")
        };
        const payload: CreateCategoryPayload = {
            name: name.trim(),
        };

        createCategory.mutate(payload, {
            onSuccess: () => {
                Alert.alert("Sukses", "Category berhasil dibuat");
                setName("");
                onRequestClose();
           },
            onError: (err: any) => {
                console.error("Error create category:", err);
                Alert.alert("Error", err.message || "Terjadi kesalahan");
            }
        });
    }

    const disableSave = !name.trim() || createCategory.isPending;

    return (
        <BottomSheet title="Buat Kategori" visible={visible} onRequestClose={onRequestClose}>
            <Wrapper padding={16} gap={12}>
                <Input label="Nama Kategori" placeholder="Masukkan Nama Kategori" value={name} onChangeText={setName}/>
                <Button label={createCategory.isPending ? "Menyimpan..." : "Simpan"} onPress={handleSave} disabled={disableSave}/>
            </Wrapper>
        </BottomSheet>
    );
};

export default CreateCategorySheet;