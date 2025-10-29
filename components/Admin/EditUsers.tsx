import { useUsers } from "@/utils/apis/apiAdmin";
import { User, UserRole } from "@/utils/types/user";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../BottomSheet";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

type EditAccountProps = {
  user: User;
  visible: boolean;
  onRequestClose: () => void;
}

const EditAccount: FC<EditAccountProps> = ({ user, visible, onRequestClose }) => {
  if (!user) return null;

  const [values, setValues] = useState({
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    password: "",
    role: user.role ?? "",
  });

  const { updateUser, loading } = useUsers();

  const handleSave = async () => {
    if (!values.name.trim() || !values.email.trim() || !values.role) {
      Alert.alert("Peringatan", "Nama, Email, dan Role wajib diisi!");
      return;
    }

    try {
      await updateUser(values.id, {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password || "",
        role: values.role,
      });
      Alert.alert("Sukses", "Akun berhasil diperbarui!");
      onRequestClose?.(); // tutup sheet setelah berhasil
    } catch (err: any) {
      console.error(err);
      Alert.alert("Gagal", "Terjadi kesalahan saat memperbarui akun");
    }
  };

  // console.log("EditAccount rendered, visible:", visible, "user:", user?.name);

  return (
    <GestureHandlerRootView>
      <BottomSheet
        title="Edit Akun"
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <FormGroup>
          <Input
            label="Nama Lengkap"
            value={values.name}
            onChangeText={(text) => setValues({ ...values, name: text })}
          />
          <Input
            label="Email"
            value={values.email}
            onChangeText={(text) => setValues({ ...values, email: text })}
            keyboardType="email-address"
          />
          {/* <Input
            label="Password (opsional)"
            value={values.password}
            onChangeText={(text) => setValues({ ...values, password: text })}
            secureTextEntry
            placeholder="Kosongkan jika tidak ingin diubah"
          /> */}

          <Select
            label="Pilih Role"
            placeholder="Pilih Role Pengguna"
            value={values.role}
            onChange={(value) =>
              setValues({ ...values, role: value as UserRole })
            }
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Owner", value: "owner" },
            ]}
          />
        </FormGroup>

        {updateUser && (updateUser as any).error && (
          <ErrorMessage
            message={
              (updateUser as any).error?.message || "Terjadi kesalahan sistem"
            }
          />
        )}

        <Button
          label={loading ? "Menyimpan..." : "Simpan Perubahan"}
          icon="check"
          loading={loading}
          onPress={handleSave}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default EditAccount;