import { useGetCategory } from "@/hooks/useCategory";
import { useCreateProduct } from "@/hooks/useProduct";
import api from "@/utils/apis";
import axios from "axios";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import Wrapper from "../Wrapper";
import Input from "../Input";
import Select from "../Select";
import ImageSelector from "../ImageSelector";
import Button from "../Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../BottomSheet";
import FormGroup from "../FormGroup";
import Badge from "../Badge";
import Text from "../Text";
import { CreateProductPayload } from "@/utils/types/product";
import apiProduct from "@/utils/apis/apiProduct";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory]= useState<number|undefined>(undefined);
    const [image, setImage] = useState<string | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const {data: categories} = useGetCategory();
    const createProduct = useCreateProduct();

    // const handleImageUpload = async (uri: string) => {
    //     const formData = new FormData();
    //     formData.append("image", {
    //         uri,
    //         name: "image.jpg",
    //         type: "image/jpeg",
    //     } as any);

    //     try {
    //         const res = await apiProduct.postProduct;
    //         return res;
    //     } catch (err) {
    //         console.error("Error uploading image",err);
    //         throw err;
    //     };
    // };

 const handleSave = () => {
  const payload: CreateProductPayload = {
    name,
    stock: parseInt(stock) || 0,
    category_id: Number(category) || 0,
    image, // langsung URI string dari ImageSelector
  };

  createProduct.mutate(payload, {
    onSuccess: () => {
      Alert.alert("Success", "Product created");
      setName("");
      setStock("");
      setCategory(undefined);
      setImage(null);
    },
    onError: (err) => {
      console.error("Error create:", err);
      Alert.alert("Error", "Gagal create product");
    },
  });
};


    return (
        <GestureHandlerRootView>
            <TouchableOpacity onPress={() => setShow(!show)}>
                <Badge label="Tambah Produk" color="neutral"/>
            </TouchableOpacity>
            <BottomSheet visible={show} title="Tambah Produk" onRequestClose={() => setShow(false)}>
                    <Input label="Nama Produk" placeholder="Nama Produk" value={name} onChangeText={setName}/>
                    <Input label="Stok Produk" placeholder="Stok Produk" value={stock} onChangeText={setStock} keyboardType="numeric"/>
                    <Select label="Kategori"  value={categories?.find(c => c.id === category)?.id.toString()} options={categories?.map((cat) => ({label: cat.name, value: cat.id.toString()})) || []} onChange={(id) => {
                        console.log('id', id);
                        setCategory(parseInt(id));
                    }}/>
                    <ImageSelector label="Pilih Gambar Produk" value={image || ""} onChange={setImage}/>

                    <Text>{JSON.stringify(category)}</Text>
                <Button label="Simpan" icon="check" onPress={handleSave}/>
            </BottomSheet>
        </GestureHandlerRootView>
    )
};

export default CreateProduct;