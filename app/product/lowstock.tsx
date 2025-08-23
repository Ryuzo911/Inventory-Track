import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import Wrapper from "@/components/Wrapper";
import { useColor } from "@/hooks/useColor";
import { useGetProduct } from "@/hooks/useProduct";
import { router } from "expo-router";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";

const LowstockScreen = () => {
  const {color} = useColor();
  const {data, isLoading, refetch} = useGetProduct();
  
  const listData = data?.filter((item) => item.stock < 5);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
        <Wrapper gap={5} padding={20}>
            {listData?.map((product) => (
                <TouchableOpacity key={product.id}>
                    <MenuItem key={product.id} title={product.name} subtitle={product.stock.toString()} icon="package" disabled={false} onPress={() => router.push(`/product/${product.id}`)} />
                </TouchableOpacity>
            ))}
        </Wrapper>
    </ScrollView>
  )
}

export default LowstockScreen;