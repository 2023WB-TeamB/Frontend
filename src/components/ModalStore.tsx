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
//
export const useModalStore = create<modalState>((set) => ({
  // 로그인 모달 상태고나리
  isSigninOpen: false,
  toggleSignin: () => set((state) => ({ isSigninOpen: !state.isSigninOpen })),
  // 회원가입 모달 상태관리
  isRegisterOpen: false,
  toggleRegister: () => set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),
  // 검색 모달 상태관리
  isSearchListOpen: false,
  searchListOpen: () => set(() => ({ isSearchListOpen: true })),
  searchListClose: () => set(() => ({ isSearchListOpen: false })),
}))
// 로컬스토리지 상태관리
export const useLocalStorageStore = create<localStorageState>((set) => ({
  isGetToken: true,
  setisGetToken: (state) => set({ isGetToken: state }),
}))
// 검색결과 상태관리
export const useSearchStore = create<SearchState>((set) => ({
  filteredData: [],
  setFilteredData: (data) => set({ filteredData: data }),
}))
