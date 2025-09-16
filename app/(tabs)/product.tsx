import Input from '@/components/Input'
import Wrapper from '@/components/Wrapper'
import { useColor } from '@/hooks/useColor'
import { useGetProduct } from '@/hooks/useProduct'
import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import ProductItem from '@/components/product/ProductItem'
import CreateProductSheet from '@/components/product/CreateProduct'


const ProductScreen = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [search, setSearch] = useState<string>("");
  const {data, isLoading, refetch} = useGetProduct();
  const {color} = useColor();

  const listData = data?.filter((item) => item.name.toString().toLowerCase().includes(search.toLowerCase()))

  return (
      <Wrapper flex={1}>
        <Wrapper key={"header"} padding={20}>
          <Input placeholder="Cari Produk" value={search} onChangeText={setSearch} wrapperStyle={{}}/>  
        </Wrapper>
          <FlatList data={listData}  keyExtractor={(item) => item.id?.toString() ?? ''} renderItem={({item}) => (
            <TouchableOpacity>
              <ProductItem image_url={item.image_url ?? ''} name={item.name} stock={item.stock} onPress={() => router.push(`/product/${item.id}`)}/>
            </TouchableOpacity>
          )} contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
          }} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} />

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
             <CreateProductSheet visible={showSheet} onRequestClose={() => setShowSheet(false)}/>

      </Wrapper>
    
  )
}

export default ProductScreen;