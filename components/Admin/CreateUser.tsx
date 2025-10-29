import { FC, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../BottomSheet";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import FormGroup from "../FormGroup";
import { useUsers } from "@/utils/apis/apiAdmin";

type AddAccountProps = {
  visible: boolean;
  onClose: () => void;
};

const AddAccount: FC<AddAccountProps> = ({ visible, onClose }) => {
  const { createUser, loading } = useUsers();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSave = async () => {
    if (!values.name.trim() || !values.email.trim() || !values.password.trim() || !values.role) {
      return Alert.alert("Peringatan", "Semua kolom wajib diisi!");
    }

    try {
      await createUser(values);
      setValues({ name: "", email: "", password: "", role: "" });
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  const disableSave =
    !values.name.trim() ||
    !values.email.trim() ||
    !values.password.trim() ||
    !values.role ||
    loading;

  return (
    <GestureHandlerRootView>
      <BottomSheet
        title="Tambah Akun Baru"
        visible={visible}
        onRequestClose={onClose}
      >
        <FormGroup>
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama pengguna"
            value={values.name}
            onChangeText={(text) => setValues({ ...values, name: text })}
          />
          <Input
            label="Email"
            placeholder="Masukkan email pengguna"
            keyboardType="email-address"
            value={values.email}
            onChangeText={(text) => setValues({ ...values, email: text })}
          />
          <Input
            label="Password"
            placeholder="Masukkan password"
            secureTextEntry
            value={values.password}
            onChangeText={(text) => setValues({ ...values, password: text })}
          />
          <Select
            label="Pilih Role"
            placeholder="Pilih role pengguna"
            value={values.role}
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Owner", value: "owner" },
            ]}
            onChange={(val) => setValues({ ...values, role: val })}
          />
        </FormGroup>

        <Button
          label={loading ? "Menyimpan..." : "Simpan Akun"}
          icon="check"
          loading={loading}
          disabled={disableSave}
          onPress={handleSave}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default AddAccount;
