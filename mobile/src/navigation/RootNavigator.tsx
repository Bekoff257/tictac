import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LobbyScreen } from '@/screens/LobbyScreen';
import { MatchScreen } from '@/screens/MatchScreen';
import { ShopScreen } from '@/economy/ShopScreen';
import { AdminDashboardScreen } from '@/admin/AdminDashboardScreen';

export type RootStackParamList = {
  Lobby: undefined;
  Match: { roomId: string };
  Shop: undefined;
  AdminDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Lobby" component={LobbyScreen} />
    <Stack.Screen name="Match" component={MatchScreen} />
    <Stack.Screen name="Shop" component={ShopScreen} />
    <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
  </Stack.Navigator>
);
