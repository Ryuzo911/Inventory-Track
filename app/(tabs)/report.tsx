import React, { useMemo, useState, useRef, useEffect } from "react";
import { FlatList, RefreshControl, View, Animated, Easing } from "react-native";
import Wrapper from "@/components/Wrapper";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Octicons } from "@expo/vector-icons";
import { useGetProduct } from "@/hooks/useProduct";
import { useGetCategory } from "@/hooks/useCategory";
import { useColor } from "@/hooks/useColor";
import { usePermissions } from "@/hooks/authentication/usePermissions";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const LOW_STOCK_THRESHOLD = 5;

const ReportScreen = () => {
  const { color } = useColor();
  const { data: productsRaw, isPending: pendingProducts, refetch: refetchProducts } = useGetProduct();
  const { data: categoriesRaw } = useGetCategory();
  const { hasPermission, role } = usePermissions(); 

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);
  const [sortOrder, seSortOrder] = useState<"asc" | "desc">("asc");

  const products = productsRaw ?? [];
  const categories = categoriesRaw ?? [];

  const totalProducts = products.length;
  const lowStockCount = products.filter((p:any) => Number(p.stock) > 0 && Number(p.stock) <= LOW_STOCK_THRESHOLD).length;
  const outOfStockCount = products.filter((p:any) => Number(p.stock) <= 0).length;

  const categoryOptions = [{ label: "Semua Kategori", value: "" }, ...categories.map((c:any) => ({ label: c.name, value: String(c.id) }))];

  const filtered = useMemo(() => {
    let list = products.slice();
    if (categoryFilter) list = list.filter((p:any) => Number(p.category_id) === Number(categoryFilter));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p:any) => (p.name ?? "").toString().toLowerCase().includes(q));
    }
    list.sort((a:any,b:any) => {
      const aStock = Number(a.stock) || 0;
      const bStock = Number(b.stock) || 0;
      return sortOrder === "asc" ? aStock - bStock : bStock - aStock;
    });
    return list;
  }, [products, query, categoryFilter, sortOrder]);

  const canAccess = hasPermission("manage_product") && (role === "owner" || role === "admin");

  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!canAccess) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -8, duration: 80, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 80, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 70, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 70, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, easing: Easing.linear, useNativeDriver: true }),
      ]).start();
    }
  }, [canAccess, shakeAnim]);

  // const exportCSV = async () => {
  //   try {
  //     const header = ["id","name","category","stock"].join(",");
  //     const rows = products.map((p:any) => {
  //       const cat = categories.find((c:any) => c.id === p.category_id)?.name ?? "";
  //       const safeName = `"${String(p.name || "").replace(/"/g, '""')}"`;
  //       const safeCat = `"${String(cat).replace(/"/g, '""')}"`;
  //       return [p.id, safeName, safeCat, Number(p.stock) || 0].join(",");
  //     });
  //     const csv = [header, ...rows].join("\n");
  //     const path = `${FileSystem.cacheDirectory}report_products_${Date.now()}.csv`;
  //     await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });
  //     await Sharing.shareAsync(path, { mimeType: "text/csv", dialogTitle: "Export Laporan Produk" });
  //   } catch (err:any) {
  //     console.error("Export error", err);
  //     alert("Gagal export");
  //   }
  // };

  const renderRow = ({item}: any) => {
    const catName = categories.find((c:any) => c.id === item.category_id)?.name ?? "";
    const stock = Number(item.stock) || 0;
    const isLow = stock > 0 && stock <= LOW_STOCK_THRESHOLD;
    const isZero = stock <= 0;

    return (
      <Wrapper flexDirection="row" alignItems="center" paddingVertical={12} borderBottomWidth={1} borderBottomColor={color.card.content}>
        <View style={{ flex: 1 }}>
          <Text variant="subtitle" numberOfLines={1} ellipsizeMode="tail" style={{ paddingLeft: 8}}>{item.name}</Text>
        </View>

        <View style={{ width: 120, alignItems: "center", paddingRight: 25 }}>
          <Text variant="menutitle">{catName}</Text>
        </View>

        <View style={{ width: 80, alignItems: "flex-end", }}>
          <Text variant="subtitle" style={{ fontWeight: "600" as any, paddingRight: 12 }}>{stock}</Text>

          {isZero ? (
            <Wrapper padding={6} borderRadius={8} marginTop={6} backgroundColor={color.error.bg}>
              <Text style={{ color: color.base.bg, fontSize: 11 }}>Habis</Text>
            </Wrapper>
          ) : isLow ? (
            <Wrapper padding={6} borderRadius={8} marginTop={6} backgroundColor={color.warning.bg}>
              <Text style={{ color: color.base.bg, fontSize: 11 }}>Kritis</Text>
            </Wrapper>
          ) : null}
        </View>
      </Wrapper>
    );
  };

  if (!canAccess) {
    return (
      <Wrapper flex={1} justifyContent="center" alignItems="center" padding={16}>
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <Octicons name="shield-lock" size={64} color={color.warning.bg} />
        </Animated.View>
        <Text variant="subtitle" style={{ marginTop: 12, textAlign: "center", color: color.info.content }}>
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper flex={1} padding={16}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
        <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
          <Octicons name="package" size={20} color={color.primary.bg} />
          <Text style={{ marginTop: 8 }}>Total Produk</Text>
          <Text variant="title">{totalProducts}</Text>
        </Wrapper>

        <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
          <Octicons name="alert" size={20} color={color.warning.bg} />
          <Text style={{ marginTop: 8 }}>Stok ≤ {LOW_STOCK_THRESHOLD}</Text>
          <Text variant="title">{lowStockCount}</Text>
        </Wrapper>

        <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
          <Octicons name="x" size={20} color={color.error.bg} />
          <Text style={{ marginTop: 8 }}>Stok Habis</Text>
          <Text variant="title">{outOfStockCount}</Text>
        </Wrapper>
      </View>

      <Wrapper gap={8} marginBottom={12}>
        <Input placeholder="Cari produk..." value={query} onChangeText={setQuery} />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Select label="" placeholder="Filter Kategori" value={categoryFilter ? String(categoryFilter) : ""} options={categoryOptions} onChange={(val:string) => { const parsed = parseInt(val, 10); setCategoryFilter(isNaN(parsed) ? undefined : parsed); }} />
          <Select label="" placeholder="Urutkan" value={sortOrder} options={[{ label: "Stok terendah", value: "asc" }, { label: "Stok tertinggi", value: "desc" }]} onChange={(val:string) => seSortOrder(val === "asc" ? "asc" : "desc")} />
        </View>
      </Wrapper>

      <Wrapper flexDirection="row" gap={12} paddingVertical={8} borderBottomWidth={1} borderBottomColor={color.card.content}>
        <View style={{ width: "auto" }} />
        <Text variant="menutitle" style={{ flex: 1, fontWeight: 600 }}>Produk</Text>
        <Text variant="menutitle" style={{ width: 120, textAlign: "center", fontWeight: 600 }}>Kategori</Text>
        <Text variant="menutitle" style={{ width: 80, textAlign: "right", fontWeight: 600 }}>Stok</Text>
      </Wrapper>

      <FlatList data={filtered} keyExtractor={(item:any) => String(item.id)} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={pendingProducts} onRefresh={refetchProducts} />} contentContainerStyle={{ paddingBottom: 120 }} renderItem={renderRow} />

      <Wrapper position="absolute" bottom={16} left={16} right={16} alignItems="center">
        <View style={{ width: "100%" }}>
          {/* <Button label="Ekspor" icon="download" onPress={exportCSV} /> */}
        </View>
      </Wrapper>
    </Wrapper>
  );
};

export default ReportScreen;
