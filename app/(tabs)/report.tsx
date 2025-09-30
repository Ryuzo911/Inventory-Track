import { useGetCategory } from "@/hooks/useCategory";
import { useColor } from "@/hooks/useColor";
import { useGetProduct } from "@/hooks/useProduct";
import { useMemo, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Wrapper from "@/components/Wrapper";
import { FlatList, Image, RefreshControl, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

const LOW_STOCK_THRESHOLD = 5;

const ReportScreen = () => {
    const {color} = useColor();
    const {data: productsRaw, isPending: pendingProducts, refetch: refetchProducts} = useGetProduct();
    const {data: categoriesRaw, isPending: pendingCategories, refetch: refetchCategories} = useGetCategory();

    const [query, setQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);
    const [sortOrder, seSortOrder] = useState<"asc" | "desc">("asc");

    const products = productsRaw ?? [];
    const categories = categoriesRaw ?? [];

    const totalProducts = products.length;
    const lowStockCount = products.filter((p: any) => typeof p.stock === "number" && p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;
    const outOfStockCount = products.filter((p: any) => typeof p.stock === "number" && p.stock <= 0).length;
    const totalStock = products.reduce((s: number, p: any) => s + (Number(p.stock) || 0), 0);

    const categoryOptions = [{label: "Semua Kategori", value: ""}, ...categories.map((c: any) => ({label: c.name, value: String(c.id)}))];

    const filtered = useMemo(() => {
        let list = products.slice();

        if (categoryFilter) {
            list = list.filter((p: any) => Number(p.category_id) === Number(categoryFilter));
        }

        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter((p: any) => (p.name ?? "").toString().toLowerCase().includes(1));
        }

        list.sort((a: any, b: any) => {
            const aStock = Number(a.stock) || 0;
            const bStock = Number(b.stock) || 0;
            return sortOrder === "asc" ? aStock - bStock : bStock - aStock;
        });
        return list;
    }, [products, query, categoryFilter, sortOrder]);

    const exportCSV = async () => {
        try {
            const header = ["id", "name", "category", "stock",].join(",");
            const rows = products.map((p: any) => {
                const cat = categories.find((c: any) => c.id === p.category_id)?.name ?? "";

                const safeName = `"${String(p.name || "").replace(/"/g, '"')}`;
                const safeCat = `"${String(cat).replace(/"/g, '"')}`;
                return [p.id, safeName, safeCat, Number(p.stock) || 0].join(",");
            });
            const csv = [header, ...rows].join("\n");
            const path = `${FileSystem.Directory}report_products_${Date.now()}.csv`;
            await FileSystem.writeAsStringAsync(path, csv, {encoding: "utf8"});
            await Sharing.shareAsync(path, {mimeType: "text/csv", dialogTitle: "Expor Laportan Produk"});
        } catch (err: any) {
            console.error("Export error",err);
            alert("Terjadi kesalahan saat export");
        }
    };

    const  renderRow = ({item}: any) => {
        const catName = categories.find((c: any) => c.id === item.category_id)?.name ?? "";
        const stock = Number(item.stock) || 0;
        const isLow = stock > 0 && stock <= LOW_STOCK_THRESHOLD;
        const isZero = stock <= 0;

        return (
            <Wrapper
        flexDirection="row"
        alignItems="center"
        paddingVertical={12}
        borderBottomWidth={1}
        borderBottomColor={color.card.content}
      >
        {/* <View style={{ width: 56, height: 56, marginRight: 12 }}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: color.card.bg }}
              resizeMode="cover"
            />
          ) : (
            <Wrapper width={32} height={32} borderRadius={8} backgroundColor={color.card.bg} justifyContent="center" alignItems="center">
              <Octicons name="package" size={30} color={color.primary.bg} />
            </Wrapper>
          )}
        </View> */}

        <View style={{ flex: 1, }}>
          <Text variant="subtitle" numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>

        <View style={{ width: 120, alignItems: "center", paddingRight: 30, }}>
          <Text variant="menutitle">{catName}</Text>
        </View>

        <View style={{ width: 80, alignItems: "center", paddingLeft: 40,}}>
          <Text variant="subtitle" style={{ fontWeight: "600" as any }}>
            {stock}
          </Text>

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
        )
    };

    return (
        <Wrapper flex={1} padding={16}>
            <View style={{flexDirection: "row", justifyContent: "space-between", gap: 8, marginBottom: 12}}>
                <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
                    <Octicons name="package" size={20} color={color.primary.bg}/>
                    <Text style={{marginTop: 8}} >Total Produk</Text>
                    <Text variant="title">{totalProducts}</Text>
                </Wrapper>

                <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
                    <Octicons name="alert" size={20} color={color.warning.bg}/>
                    <Text style={{marginTop: 8}} >Stok &le; {LOW_STOCK_THRESHOLD}</Text>
                    <Text variant="title">{lowStockCount}</Text>
                </Wrapper>

                <Wrapper flex={1} padding={12} borderRadius={12} backgroundColor={color.card.bg} alignItems="center">
                    <Octicons name="x" size={20} color={color.error.bg}/>
                    <Text style={{marginTop: 8}}>Stok Habis</Text>
                    <Text variant="title">{outOfStockCount}</Text>
                </Wrapper>
            </View>

            <Wrapper gap={8} marginBottom={12}>
                <Input placeholder="Cari produk..." value={query} onChangeText={setQuery}/>
                <View style={{flexDirection: "row", gap: 8,}}>
                    <Select label="" placeholder="Filter Kategori" value={categoryFilter ? String(categoryFilter) : ""} options={categoryOptions} onChange={(val: string) => {const parsed = parseInt(val); setCategoryFilter(isNaN(parsed) ? undefined :parsed)}}
                    />
                    <Select label="" placeholder="Urutkan" value={sortOrder} options={[
                        {label: "Stok terendah", value: "asc"},
                        {label: "Stok tertinggi", value: "desc"},
                    ]} onChange={(val:string) => seSortOrder(val === "asc" ? "asc" : "desc")}/>
                </View>
            </Wrapper>

            <Wrapper flexDirection="row" gap={12} paddingVertical={8} borderBottomWidth={1} borderBottomColor={color.card.content}>
                <Text style={{flex: 1, fontWeight: 600,}}>Produk</Text>
                <Text style={{width: 120, textAlign: "center", fontWeight: 600,}}>Kategori</Text>
                <Text style={{width: 80, textAlign: "right", fontWeight: 600,}}>Stok</Text>
            </Wrapper>

            <FlatList data={filtered} keyExtractor={(item: any) => String(item.id)} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={pendingProducts} onRefresh={refetchProducts}/>} contentContainerStyle={{paddingBottom: 120}} renderItem={renderRow}/>

            <Wrapper position="absolute" bottom={16} left={16} right={16} alignItems="center">
                <View style={{width: "100%",}}>
                    <Button label="Ekspor" icon="download" onPress={exportCSV}/>
                </View>
            </Wrapper>
        </Wrapper>
    )
};

export default ReportScreen;