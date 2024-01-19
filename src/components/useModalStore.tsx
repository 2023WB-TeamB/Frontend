import { create } from 'zustand'

interface modalState {
  isSigninOpen: boolean
  toggleSignin: () => void

  isRegisterOpen: boolean
  toggleRegister: () => void

  isSearchListOpen: boolean
  searchListOpen: () => void
  searchListClose: () => void
}
interface localStorageState {
  isSignin: boolean
  setIsSignin: (state: boolean) => void
}

export const useModalStore = create<modalState>((set) => ({
  isSigninOpen: false,
  toggleSignin: () => set((state) => ({ isSigninOpen: !state.isSigninOpen })),

  isRegisterOpen: false,
  toggleRegister: () => set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),

  isSearchListOpen: false,
  searchListOpen: () => set(() => ({ isSearchListOpen: true })),
  searchListClose: () => set(() => ({ isSearchListOpen: false })),
}))

export const useLocalStorageStore = create<localStorageState>((set) => ({
  isSignin: false,
  setIsSignin: (state) => set({ isSignin: state }),
}))
