import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import Text from "@/components/Text";
import Wrapper from "@/components/Wrapper";
import { useGetCategory } from "@/hooks/useCategory";
import { useColor } from "@/hooks/useColor";
import { useShowProduct } from "@/hooks/useProduct";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";

const ProductDetailScreen = () => {
    const {color} = useColor();
    const {id} = useLocalSearchParams();

    const {data, isLoading, refetch} = useShowProduct(Number(id));
    const {data: categories} = useGetCategory();


    if (!data) return <Loading/>;

    const name = data?.name;
    const categoryName = categories?.find((c: any) => c.id === data.category_id)?.name
    const stock = data?.stock;
    const image = data?.image_url;

     return (
        <Wrapper>
           <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
                  <ProductCard name={name} stock={stock} image_url={image}/>
                  <Text variant="subtitle" style={{textAlign: "center"}} >{categoryName}</Text> 
           </ScrollView>
        </Wrapper>
     )
};

export default ProductDetailScreen;