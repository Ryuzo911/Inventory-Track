import { useGetProduct } from "@/hooks/useProduct";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { enumType } from "@/utils/types/transaction";
import { FC, useMemo, useState } from "react";
import { Alert, View } from "react-native";
import BottomSheet from "../BottomSheet";
import Wrapper from "../Wrapper";
import Text from "../Text";
import Select from "../Select";
import Button from "../Button";
import Input from "../Input";
import IconButton from "../IconButton";

type AddTransactionSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
};

const AddTransactionSheet: FC<AddTransactionSheetProps> = ({
  visible,
  onRequestClose,
}) => {
  const { data: products } = useGetProduct();
  const createTx = useCreateTransaction();

  const [product, setProduct] = useState<any | null>(null);
  const [type, setType] = useState<enumType>("out");
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  const productOptions = (products || []).map((p: any) => ({
    label: `${p.name}`,
    value: String(p.id),
  }));

  const handleSave = () => {
    if (!product) {
      Alert.alert("Pilih Product");
      return;
    }
    if (!quantity || quantity <= 0) {
      Alert.alert("Masukkan jumlah yang valid");
      return;
    }
    if (type === "out" && quantity > product.stock) {
      Alert.alert("Stok tidak cukup", `Stock saat ini: ${product.stock}`);
      return;
    }

    const payload = {
      product_id: product.id,
      type,
      quantity,
      note: note || undefined,
    };

    createTx.mutate(payload, {
      onSuccess: () => {
        Alert.alert("Sukses", "Transaksi tersimpan");
        setProduct(null);
        setType("out");
        setQuantity(0);
        setNote("");
        onRequestClose();
      },
      onError: (err: any) => {
        console.error("Gagal membuat transaksi:", err);
        Alert.alert(
          "Gagal",
          err?.response?.data?.message || err.message || "Coba lagi"
        );
      },
    });
  };

  return (
    <BottomSheet
      title="Buat transaksi"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Wrapper padding={16} gap={12}>
        <Select
          label="Pilih product"
          placeholder="Cari product"
          value={product ? String(product.id) : ""}
          options={productOptions}
          onChange={(val) => {
            const selected = products?.find((p: any) => String(p.id) === val);
            setProduct(selected || null);
          }}
        />

        {product && (
          <Text variant="label">Stock saat ini: {product.stock}</Text>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
            marginVertical: 8,
          }}
        >
          <IconButton
            icon="diff-added"
            onPress={() => setType("in")}
            color={type === "in" ? "primary" : "base"}
          />
          <IconButton
            icon="diff-removed"
            onPress={() => setType("out")}
            color={type === "out" ? "error" : "base"}
          />
        </View>

         <Input
          label="Jumlah"
          keyboardType="numeric"
          value={String(quantity)}
          onChangeText={(t) => setQuantity(parseInt(t) || 0)}
        />
        {type === "out" && product && (
          <Button label="Max" onPress={() => setQuantity(product.stock)} />
        )}

        <Button
          label={createTx.isPending ? "Menyimpan..." : "Simpan"}
          onPress={handleSave}
          disabled={createTx.isPending}
          icon="file-moved"
        />
      </Wrapper>
    </BottomSheet>
  );
};

export default AddTransactionSheet;
