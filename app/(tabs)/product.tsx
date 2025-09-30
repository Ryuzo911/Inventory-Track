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
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const ProductScreen = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [search, setSearch] = useState<string>("");
  const {data, isLoading, refetch} = useGetProduct();
  const {color} = useColor();
  console.log("show sheet",showSheet);

  const listData = data?.filter((item) => item.name.toString().toLowerCase().includes(search.toLowerCase()))

  return (
      <GestureHandlerRootView>
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

        <View pointerEvents='box-none' style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          elevation: 99,
        }}>
          <TouchableOpacity onPress={() => {
            console.log("open sheet");
            setShowSheet(true);
          }} activeOpacity={0.85} hitSlop={{top: 16, bottom: 16, left: 16, right: 16}} style={{
            backgroundColor: color.primary.bg,
            borderRadius: 999,
            padding: 14,
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <Octicons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
          <CreateProductSheet visible={showSheet} onRequestClose={() => {
            console.log("close sheet");
            setShowSheet(false);
          }}/>
        </View>
        </Wrapper>
      </GestureHandlerRootView>
    
  )
}

export default ProductScreen;