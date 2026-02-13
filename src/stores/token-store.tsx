import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TokenStore {
	accessToken: string | null
	setAccessToken: (accessToken: string) => void
	removeAccessToken: () => void
}

export const useTokenStore = create<TokenStore>()(persist((set) => ({
	accessToken: null,
	setAccessToken: (accessToken: string) => set({ accessToken }),
	removeAccessToken: () => set({ accessToken: null }),
}), {
	name: 'token',
	storage: createJSONStorage(() => localStorage),
}))