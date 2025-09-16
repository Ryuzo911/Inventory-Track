// screens/ProductDetailScreen.tsx
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { Octicons, } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetProduct, useShowProduct } from "@/hooks/useProduct";
import { useGetTransaction } from "@/hooks/useTransaction";

import Wrapper from "@/components/Wrapper";
import Text from "@/components/Text";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import ProductCard from "@/components/product/ProductCard";
import EditProduct from "@/components/product/EditProduct";
import DeleteProduct from "@/components/product/DeleteProduct";
import CreateTransaction from "@/components/transaction/CreateTransaction"; // sheet for add/reduce stock
import Loading from "@/components/Loading";

const LOW_STOCK_THRESHOLD = 5;

const ProductDetailScreen = () => {
  const { color } = useColor();
  const { id } = useLocalSearchParams();
  const productId = Number(id);

  const { data: product, isLoading, refetch } = useShowProduct(productId);
  const { data: categories } = useGetCategory();

  const { data: txRaw, isLoading: txLoading, refetch: refetchTx } = useGetTransaction();

  const txList = useMemo(() => {
    if (!txRaw) return [];
    if (typeof txRaw === "object" && Array.isArray((txRaw as any).data)) return (txRaw as any).data;
    if (Array.isArray(txRaw)) return txRaw;
    return [];
  }, [txRaw]);

  const productTx = useMemo(() => {
    return txList.filter((t: any) => Number(t.product_id) === productId).sort((a: any, b: any) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [txList, productId]);

  const recentTx = productTx.slice(0, 5);

  if (!product && isLoading) return <Wrapper><Loading/></Wrapper>;
  if (!product) return <Wrapper><Text>Produk tidak ditemukan</Text></Wrapper>;

  const categoryName = categories?.find((c: any) => c.id === product.category_id)?.name ?? "—";
  const lowStock = product.stock <= LOW_STOCK_THRESHOLD;


  return (
    <Wrapper flex={1}>
      <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => { refetch(); refetchTx(); }} />}>
        <ProductCard image_url={product.image_url ?? ""} />

        <Wrapper padding={16} gap={12}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text variant="title">{product.name}</Text>
              <Text variant="subtitle" style={{ marginTop: 6, color: color.info.content }}>
                Kategori: <Text style={{ fontWeight: "600" }}>{categoryName}</Text>
              </Text>
            </View>

            <View style={{ marginLeft: 12, alignItems: "flex-end" }}>
              <Text variant="subtitle" style={{ color: lowStock ? color.error.bg : color.success.bg }}>
                Stok
              </Text>
              <Text variant="title" style={{ marginTop: 6 }}>{product.stock}</Text>
            </View>
          </View>

          {lowStock && (
            <View style={{ padding: 10, borderRadius: 8, backgroundColor: color.warning.bg }}>
              <Text style={{ color: color.warning.content }}>
                Stok rendah — pertimbangkan untuk menambah stok.
              </Text>
            </View>
          )}

      
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center", marginHorizontal: 110 }}>
            <EditProduct product={product} />
            <DeleteProduct product={product} />
          </View>

          <View style={{paddingTop: 12, borderRadius: 8, backgroundColor: color.base.bg }}>
            <Text variant="subtitle">Detail Produk</Text>
            <Text>ID: {product.id}</Text>
            <Text style={{ marginTop: 8 }}>"Tidak ada deskripsi."</Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text variant="subtitle">Riwayat Transaksi (Terbaru)</Text>

            {txLoading ? (
              <Text>Loading transaksi...</Text>
            ) : recentTx.length === 0 ? (
              <Text style={{ marginTop: 8, color: color.info.content }}>Belum ada transaksi untuk produk ini.</Text>
            ) : (
              <FlatList
                data={recentTx}
                keyExtractor={(t: any) => String(t.id)}
                nestedScrollEnabled
                scrollEnabled={false}
                renderItem={({ item }: any) => (
                  <View style={{ padding: 10, marginTop: 8, borderRadius: 8, backgroundColor: item.type === "in" ? color.success.bg : color.error.bg }}>
                    <Text>
                      {item.type === "in" ? "Masuk" : "Keluar"} — {item.quantity}
                    </Text>
                    <Text style={{ fontSize: 12, color: color.info.content }}>
                      Oleh: {item.user?.name ?? item.created_by}
                    </Text>
                    <Text style={{ fontSize: 12, color: color.info.content }}>
                      {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        </Wrapper>
      </ScrollView>

      
    </Wrapper>
  );
};

export default ProductDetailScreen;
