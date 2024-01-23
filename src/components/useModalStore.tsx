import { create } from 'zustand'
import { Doc } from '../store/store'

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
  isGetToken: boolean
  setisGetToken: (state: boolean) => void
}
interface SearchState {
  filteredData: Doc[]
  setFilteredData: (data: Doc[]) => void
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
  isGetToken: true,
  setisGetToken: (state) => set({ isGetToken: state }),
}))

export const useSearchStore = create<SearchState>((set) => ({
  filteredData: [],
  setFilteredData: (data) => set({ filteredData: data }),
}))
