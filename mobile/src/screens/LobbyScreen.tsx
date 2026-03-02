import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { GlassCard } from '@/components/GlassCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>;

export const LobbyScreen = ({ navigation }: Props) => (
  <SafeAreaView>
    <GlassCard>
      <Text>TicTac Multiplayer Lobby</Text>
      <Text>Ranked, tournaments, and spectator-ready matches.</Text>
      <View>
        <Button title="Quick Match" onPress={() => navigation.navigate('Match', { roomId: 'quick' })} />
        <Button title="Shop" onPress={() => navigation.navigate('Shop')} />
        <Button title="Admin" onPress={() => navigation.navigate('AdminDashboard')} />
      </View>
    </GlassCard>
  </SafeAreaView>
);
