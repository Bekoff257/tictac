export type Role = 'ADMIN' | 'USER';

export interface UserProfile {
  id: string;
  username: string;
  role: Role;
  mmr: number;
  points: number;
  coins: number;
  gems: number;
  premium: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'BOARD_THEME' | 'MOVE_ANIMATION' | 'PROFILE_FRAME' | 'EMOTE';
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  priceCoins?: number;
  priceGems?: number;
  owned?: boolean;
}
