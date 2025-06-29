import { create } from 'zustand';

import { THomeStore } from '~types/home';

export const useCounterStore = create<THomeStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));