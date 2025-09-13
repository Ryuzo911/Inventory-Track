import Input from '@/components/Input'
import MenuItem from '@/components/MenuItem'
import Text from '@/components/Text'
import Wrapper from '@/components/Wrapper'
import { useColor } from '@/hooks/useColor'
import { useGetProduct } from '@/hooks/useProduct'
import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import ProductItem from '@/components/product/ProductItem'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import CreateProduct from '@/components/product/CreateProduct'


const ProductScreen = () => {
  const [search, setSearch] = useState<string>("");
  const {data, isLoading, refetch} = useGetProduct();
  const {color} = useColor();
  const tabBarHeight = useBottomTabBarHeight();

  const listData = data?.filter((item) => item.name.toString().toLowerCase().includes(search.toLowerCase()))

  return (
      <Wrapper>
        <Wrapper key={"header"} padding={20}>
          <Input placeholder="Cari Produk" value={search} onChangeText={setSearch} wrapperStyle={{}}/>  
          <CreateProduct />
        </Wrapper>
          <FlatList data={listData}  keyExtractor={(item) => item.id?.toString()} renderItem={({item}) => (
            <TouchableOpacity>
              <ProductItem image_url={item.image_url} name={item.name} stock={item.stock} onPress={() => router.push(`/product/${item.id}`)}/>
            </TouchableOpacity>
          )} contentContainerStyle={{
            padding: 20,
            paddingBottom: tabBarHeight + 50,
          }} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} />
      </Wrapper>
    
  )
}

export default ProductScreen;