import React, { useState, useMemo } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import Wrapper from "@/components/Wrapper";
import Text from "@/components/Text";
import { useGetTransaction } from "@/hooks/useTransaction";
import AddTransactionSheet from "@/components/transaction/CreateTransaction";
import { Octicons } from "@expo/vector-icons";
import { useColor } from "@/hooks/useColor";

const TransactionListScreen = () => {
  const [showSheet, setShowSheet] = useState(false);
  const { color } = useColor();

  const { data: txRaw, isLoading, refetch } = useGetTransaction();

  const transactions = useMemo(() => {
    if (!txRaw) return [];

    if (typeof txRaw === "object" && Array.isArray((txRaw as any).data)) {
      return (txRaw as any).data as any[];
    }
    if (Array.isArray(txRaw)) return txRaw as any[];
    return [];
  }, [txRaw]);

  const [sortedOrder, setSortedOrder] = useState<"asc" | "desc">("desc");

  const sortedTransactions = useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortedOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [transactions, sortedOrder]);

  console.log("DEBUG transactions normalized:", transactions);
  console.log("DEBUG raw response:", txRaw);

  return (
    <Wrapper flex={1}>
      <View style={{ margin: 20, marginBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text variant="subtitle" style={{ color: color.primary.bg }}>
          Riwayat Transaksi
        </Text>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setSortedOrder("desc")}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: sortedOrder === "desc" ? color.primary.bg : "transparent",
              borderWidth: sortedOrder === "desc" ? 0 : 1,
              borderColor: "transparent",
              marginRight: 8,
            }}
            activeOpacity={0.8}
          >
            <Octicons name="arrow-down" size={18} color={sortedOrder === "desc" ? "#fff" : color.primary.bg} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSortedOrder("asc")}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: sortedOrder === "asc" ? color.primary.bg : "transparent",
              borderWidth: sortedOrder === "asc" ? 0 : 1,
              borderColor: "transparent",
            }}
            activeOpacity={0.8}
          >
            <Octicons name="arrow-up" size={18} color={sortedOrder === "asc" ? "#fff" : color.primary.bg} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <Text style={{ margin: 16 }}>Loading...</Text>
      ) : (
        <FlatList
          data={sortedTransactions}
          keyExtractor={(item: any) => String(item.id)}
          onRefresh={refetch}
          refreshing={isLoading}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          renderItem={({ item }: any) => (
            <View
              style={{
                padding: 12,
                marginVertical: 6,
                borderRadius: 8,
                backgroundColor: color.card.bg,
              }}
            >
              <Text
                variant="subtitle"
                style={{
                  color: item.type === "in" ? color.success.bg : color.error.bg,
                }}
              >
                {item.type === "in" ? "Masuk" : "Keluar"}{": "}
                {item.product?.name ?? `${item.product_id}`}
              </Text>

              <Text>Jumlah: {item.quantity}</Text>
              {item.note ? <Text>Catatan: {item.note}</Text> : null}

              <Text style={{ fontSize: 12, color: color.info.content }}>
                Dibuat oleh: {item.user?.name ?? item.created_by ?? "Unknown"}
              </Text>

              <Text style={{ fontSize: 12, color: "#6b7280" }}>
                {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => setShowSheet(true)}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          backgroundColor: color.primary.bg,
          borderRadius: 999,
          padding: 14,
          elevation: 6,
        }}
        activeOpacity={0.8}
      >
        <Octicons name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <AddTransactionSheet
        visible={showSheet}
        onRequestClose={() => {
          setShowSheet(false);
          refetch();
        }}
      />
    </Wrapper>
  );
};

export default TransactionListScreen;
