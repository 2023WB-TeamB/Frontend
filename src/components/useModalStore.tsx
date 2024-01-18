import { create } from 'zustand'

interface modalState {
  isSigninOpen: boolean
  toggleSignin: () => void

  isRegisterOpen: boolean
  toggleRegister: () => void

  isSearchListOpen: boolean
  toggleSearchList: () => void
}

const useModalStore = create<modalState>((set) => ({
  isSigninOpen: false,
  toggleSignin: () => set((state) => ({ isSigninOpen: !state.isSigninOpen })),

  isRegisterOpen: false,
  toggleRegister: () => set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),

  isSearchListOpen: false,
  toggleSearchList: () => set((state) => ({ isSearchListOpen: !state.isSearchListOpen })),
}))

export default useModalStore
