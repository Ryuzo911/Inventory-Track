import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";
import DeleteProduct from "@/components/product/DeleteProduct";
import EditProduct from "@/components/product/EditProduct";
import ProductCard from "@/components/product/ProductCard";
import Text from "@/components/Text";
import Wrapper from "@/components/Wrapper";
import { useGetCategory } from "@/hooks/useCategory";
import { useColor } from "@/hooks/useColor";
import { useGetProduct, useShowProduct } from "@/hooks/useProduct";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";

const ProductDetailScreen = () => {
    const {color} = useColor();
    const {id} = useLocalSearchParams();

    const {data, isLoading, refetch} = useShowProduct(Number(id));
    const {data: categories} = useGetCategory();


    if (!data) return <Loading/>;

    const name = data?.name ?? "";
    const categoryName = categories?.find((c: any) => c.id === data.category_id)?.name ?? "";
    const stock = data?.stock ?? 0;
    const image = data?.image_url ?? "";

     return (
        <Wrapper>
           <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
                  <ProductCard name={name} stock={stock} image_url={image}/>
                  <Wrapper gap={10}  alignItems="center">
                     <Text variant="subtitle" style={{textAlign: "center"}} >Category: {categoryName}</Text> 
                     <Wrapper flexDirection="row" gap={10} alignItems="center">
                        <EditProduct product={data}/>
                        <DeleteProduct product={data}/>
                     </Wrapper>
                  </Wrapper>
           </ScrollView>
        </Wrapper>
     )
};

export default ProductDetailScreen;