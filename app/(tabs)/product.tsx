import Input from '@/components/Input'
import MenuItem from '@/components/MenuItem'
import Text from '@/components/Text'
import Wrapper from '@/components/Wrapper'
import { useColor } from '@/hooks/useColor'
import { useGetProduct } from '@/hooks/useProduct'
import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'

const ProductScreen = () => {
  const [search, setSearch] = useState<string>("");
  const {data, isLoading, refetch} = useGetProduct();
  const {color} = useColor();

  const listData = data?.filter((item) => item.name.toString().toLowerCase().includes(search.toLowerCase()))

  return (
      <Wrapper>
        <Wrapper>
          <Input placeholder="Cari Produk" value={search} onChangeText={setSearch} wrapperStyle={{}}/>
        </Wrapper>
        <ScrollView contentContainerStyle={{flexGrow: 1, gap: 5, padding: 20,}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}>
          {listData?.map((product) => (
            <TouchableOpacity onPress={() => router.push(`/`)}>
                <MenuItem key={product.id} title={product.name} subtitle={product.stock.toString()} icon="package" disabled={false}/>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Wrapper>
    
  )
}

export default ProductScreen;