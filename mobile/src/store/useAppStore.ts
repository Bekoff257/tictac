import { create } from 'zustand';
import { ShopItem, UserProfile } from '@/types/domain';

interface AppState {
  user?: UserProfile;
  shopItems: ShopItem[];
  setUser: (user: UserProfile) => void;
  setShopItems: (items: ShopItem[]) => void;
  markOwned: (itemId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: undefined,
  shopItems: [],
  setUser: (user) => set({ user }),
  setShopItems: (shopItems) => set({ shopItems }),
  markOwned: (itemId) =>
    set((state) => ({
      shopItems: state.shopItems.map((item) =>
        item.id === itemId ? { ...item, owned: true } : item,
      ),
    })),
}));
