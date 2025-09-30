import { useGetCategory } from "@/hooks/useCategory";
import { FC, useState } from "react";
import { View } from "react-native";
import Select from "../Select";
import CreateCategorySheet from "./CreateCategory";

type SelectCategoryProps = {
    value?: number | undefined;
    onChange?: (id?: number) => void;
    label?: string;
    placeholder?: string;
    withReset?: boolean;
    options?: { label: string; value: string }[];
}

const SelectCategory: FC<SelectCategoryProps> = ({
    value,
    onChange,
    label,
    placeholder = "Pilih Kategori",
    withReset = true,
}) => {
    const {data: categories, refetch} = useGetCategory();
    const [showCreate, setShowCreate] = useState(false);

    const categoryOptions = (categories || []).map((c: any) => ({
        label: c.name,
        value: String(c.id),
    }));

    const optionsWithCreate = [
        ...categoryOptions,
        {label: "Buat Kategori Baru", value: "__create"}
    ]

    const handleChange = (val: string) => {
        if (val === "__create") {
            setShowCreate(true);
            return;
        }

        const parsed = parseInt(val);
        if(!isNaN(parsed)) {
            onChange?.(parsed);
        } else {
            onChange?.(undefined);
        }
    };

    return (
        <View>
            <Select 
                label={label}
                placeholder={placeholder}
                value={value ? String(value) : undefined}
                options={optionsWithCreate}
                onChange={handleChange}
                withReset={withReset}    
            />
            <CreateCategorySheet
                visible={showCreate}
                onRequestClose={() => setShowCreate(false)}
            />
        </View>
    );
};

export default SelectCategory;