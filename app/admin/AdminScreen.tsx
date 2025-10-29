import { FC, useState } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import { useUsers } from "@/utils/apis/apiAdmin";
import { User as UserType, UserRole } from "@/utils/types/user";
import { useColor } from "@/hooks/useColor";
import Text from "@/components/Text";
import AddAccount from "@/components/Admin/CreateUser";
import EditAccount from "@/components/Admin/EditUsers";

const ManageAccountScreen: FC = () => {
  const { color } = useColor();
  const { users, loading, deleteUser, fetchUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const openEditSheet = (user: any) => {
    const safeRole = user.role as UserRole;
    const normalizedUser: UserType = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: safeRole,
    };
    setSelectedUser(normalizedUser);
    setEditVisible(true);
    // console.log("Editing user:", normalizedUser);
  };

  const closeEditSheet = () => {
    setSelectedUser(null);
    setEditVisible(false);
    fetchUsers();
  };

  const openAddSheet = () => setAddVisible(true);
  const closeAddSheet = () => {
    setAddVisible(false);
    fetchUsers();
  };

  return (
    <Wrapper padding={16}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 8 }}>Memuat data pengguna...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: color.base.bg,
                padding: 14,
                marginBottom: 10,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text variant="label">Role: {item.role}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 14 }}>
                <TouchableOpacity onPress={() => openEditSheet(item)}>
                  <Octicons name="pencil" size={22} color={color.primary.bg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteUser(item.id)}>
                  <Octicons name="trash" size={22} color={color.warning.bg} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 80, color: "#666" }}>
              Belum ada pengguna yang terdaftar.
            </Text>
          }
        />
      )}

      {/* Tombol tambah akun */}
      <View style={{ position: "absolute", bottom: 30, left: 16, right: 16 }}>
        <Button icon="plus" label="Tambah Akun Baru" onPress={openAddSheet} />
      </View>

      {/* Bottom sheet tambah akun */}
      <AddAccount visible={addVisible} onClose={closeAddSheet} />

      {/* Bottom sheet edit akun */}
      {selectedUser && (
        <EditAccount
          visible={editVisible}
          onRequestClose={closeEditSheet}
          user={selectedUser}
        />
      )}
    </Wrapper>
  );
};

export default ManageAccountScreen;
