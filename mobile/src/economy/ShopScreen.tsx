import React, { useEffect } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { apiFetch } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import { ShopItem } from '@/types/domain';

export const ShopScreen = () => {
  const { shopItems, setShopItems, markOwned } = useAppStore();

  useEffect(() => {
    apiFetch<ShopItem[]>('/shop/items').then(setShopItems).catch(() => undefined);
  }, [setShopItems]);

  return (
    <SafeAreaView>
      <Text>Virtual Shop</Text>
      {shopItems.map((item) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Text>{item.owned ? 'Owned' : `${item.priceCoins ?? item.priceGems} currency`}</Text>
          {!item.owned && <Button title="Purchase" onPress={() => markOwned(item.id)} />}
        </View>
      ))}
    </SafeAreaView>
  );
};
