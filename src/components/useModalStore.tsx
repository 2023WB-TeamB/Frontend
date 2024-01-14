import { create } from 'zustand'

interface modalState {
  isSigninOpen: boolean
  toggleSignin: () => void

  isRegisterOpen: boolean
  toggleRegister: () => void
}

const useModalStore = create<modalState>((set) => ({
  isSigninOpen: false,
  toggleSignin: () => set((state) => ({ isSigninOpen: !state.isSigninOpen })),

  isRegisterOpen: false,
  toggleRegister: () => set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),
}))

export default useModalStore
