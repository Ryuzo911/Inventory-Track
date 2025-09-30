import ProductItem from "@/components/product/ProductItem";
import Wrapper from "@/components/Wrapper";
import { useColor } from "@/hooks/useColor";
import { useGetProduct } from "@/hooks/useProduct";
import { router } from "expo-router";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";

const LowstockScreen = () => {
  const {color} = useColor();
  const {data, isLoading, refetch} = useGetProduct();
  
  const listData = data?.filter((item) => item.stock < 5);

  return (
    <Wrapper flex={1}>
        <Wrapper gap={5} padding={20}>
           <FlatList data={listData} keyExtractor={(item) => item?.id?.toString() ?? ''} renderItem={({item}) => (
            <TouchableOpacity >
              <ProductItem name={item.name} stock={item.stock} image_url={item.image_url?.toString()} onPress={() => router.push(`/product/${item.id}`)}/>
            </TouchableOpacity>
          )} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 100}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}/>
        </Wrapper>
    </Wrapper>
  )
}

export default LowstockScreen;