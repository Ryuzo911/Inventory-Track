import Card from '@/components/Card';
import Loading from '@/components/Loading';
import MenuItem from '@/components/MenuItem';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import { ThemeColors, useColor } from '@/hooks/useColor';
import useIntro from '@/hooks/useIntro';
import { useGetProduct } from '@/hooks/useProduct';
import { useGetTransaction } from '@/hooks/useTransaction';
import apiProduct from '@/utils/apis/apiProduct';
import { router } from 'expo-router';
import React, { use, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';


const HomeScreen = () => {
  const { data: product = [], isLoading: isLoadingProduct, error: errorProduct } = useGetProduct();
  const { data: transaction = [], isLoading: isLoadingTransaction, error: errorTransaction } = useGetTransaction();
  const lowStock = product.filter((p) => p.stock < 5);
  const {color} = useColor();

  if (isLoadingProduct || isLoadingTransaction) {
    return (
        <Loading/>
    );
  };

  if (errorProduct || errorTransaction) {
    return (
      <Wrapper flex={1} padding={20}>
        <Text>Error: {errorProduct?.message || errorTransaction?.message}</Text>
      </Wrapper>
    );
  };

  return (
  <ScrollView>
     <Wrapper gap={30}>
    <Card header={<Text variant="title" color={color.primary.bg}>Inventory Sumarry</Text>}>
      <Card header={
        <Wrapper flexDirection='row' justifyContent='space-between'>
          <Wrapper justifyContent='center' alignItems='center'>
            <Text variant="title">{product.length}</Text>
            <Text variant="subtitle">Products</Text>
          </Wrapper>
          <Wrapper justifyContent='center' alignItems='center'>
            {product.map((product) => (
              <Text variant='title'>{product.stock}</Text>
            ))}
            <Text variant="subtitle">Quantities</Text>
          </Wrapper>
        </Wrapper>}/>
    </Card>

    <Card header={
      <Wrapper flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Text variant="title" color={color.primary.bg}>Low Stock</Text>
        <Text variant='text' color={color.primary.bg} onPress={() => router.push("/")}>See all</Text>
      </Wrapper>
    }>
     {product?.filter((product) => product.stock < 5).map((product) => (
        <MenuItem key={product.id} title={product.name} subtitle={`Low stock: ${product.stock} left`} icon="package" onPress={() => router.push("/")} disabled={false} image_url={product.image_url}/>
     )
    )}
    </Card>
   </Wrapper>
  </ScrollView>
  );
};

export default HomeScreen;
