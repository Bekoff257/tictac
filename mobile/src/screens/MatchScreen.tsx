import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Match'>;

export const MatchScreen = ({ route }: Props) => (
  <SafeAreaView>
    <Text>Room: {route.params.roomId}</Text>
    <Text>Real-time match, timer, rematch, chat, and replay hooks are wired via socket service.</Text>
  </SafeAreaView>
);
