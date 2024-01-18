import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 문서 데이터
export type Doc = {
  id: number
  title: string
  created_at: string
  color: string
}

type DocState = {
  docs: Doc[]
  setDocs: (docs: Doc[]) => void
  addDoc: (doc: Doc) => void
}

export const docStore = create<DocState>((set) => ({
  docs: [],
  setDocs: (docs) => set({ docs }),
  addDoc: (doc) => set((state) => ({ docs: [doc, ...state.docs] })),
}))

// 생성할 문서 언어
interface Language {
  isEnglish: boolean
  setIsEnglish: (isEnglish: boolean) => void
}

export const isEnglishStore = create<Language>((set) => ({
  isEnglish: false,
  setIsEnglish: (isEnglish) => set(() => ({ isEnglish: isEnglish })),
}))

// 모달 상태
interface Modal {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
}

export const modalOpenStore = create<Modal>((set) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
}))

// 모달 내용
interface modalContent {
  modalContent: { id: number; title: string; created_at: string; color: string } | null
  setModalContent: (
    content: { id: number; title: string; created_at: string; color: string } | null,
  ) => void
}

export const modalContentStore = create<modalContent>((set) => ({
  modalContent: null,
  setModalContent: (content) => set(() => ({ modalContent: content })),
}))

// 선택한 카드 ID
interface CardId {
  cardId: number
  setCardId: (cardId: number) => void
}

export const cardIdStore = create<CardId>((set) => ({
  cardId: 0,
  setCardId: (cardId) => set({ cardId }),
}))

// 변경할 색상
interface CardColor {
  cardColor: string
  setCardColor: (cardColor: string) => void
}

export const cardColorStore = create<CardColor>((set) => ({
  cardColor: 'black',
  setCardColor: (cardColor) => set({ cardColor }),
}))

// 문서 삭제 여부
interface Delete {
  isDelete: boolean
  setIsDelete: (isDelete: boolean) => void
}

export const isDeleteStore = create<Delete>((set) => ({
  isDelete: false,
  setIsDelete: (isDelete) => set({ isDelete }),
}))

// 문서 생성중 여부
type Generating = {
  isGenerating: boolean
  setIsGenerating: (value: boolean) => void
}

export const isGeneratingStore = create<Generating>((set) => ({
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
}))

/*다크모드*/
interface State {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const useDarkModeStore = create<State>(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state: State) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'dark-mode',
    },
  ) as any,
)

// * 뷰어/에디터 상태
interface SidePeekState {
  isOpenSideAlways: boolean
  toggleOpenSideAlways: () => void
}
interface ViewerPageOpenState {
  isOpenGalleryPanel: boolean
  isOpenVersionPanel: boolean
  isOpenOptions: boolean
  openGalleryPanel: () => void
  closeGalleryPanel: () => void
  openVersionPanel: () => void
  closeVersionPanel: () => void
  openOptions: () => void
  closeOptions: () => void
}
interface ConfirmBoxState {
  isOpenConfirm: boolean
  ConfirmLabel: string
  openConfirm: () => void
  closeConfirm: () => void
  setConfirmLabel: (label: string) => void
}

export const useSidePeekStore = create<SidePeekState>((set) => ({
  isOpenSideAlways: false,
  toggleOpenSideAlways: () =>
    set((state) => ({
      isOpenSideAlways: !state.isOpenSideAlways,
    })),
}))

export const useViewerPageOpenStore = create<ViewerPageOpenState>((set) => ({
  isOpenGalleryPanel: false,
  isOpenVersionPanel: false,
  isOpenOptions: false,
  openGalleryPanel: () =>
    set(() => ({
      isOpenVersionPanel: false,
      isOpenGalleryPanel: true,
    })),
  closeGalleryPanel: () =>
    set(() => ({
      isOpenGalleryPanel: false,
    })),
  openVersionPanel: () =>
    set(() => ({
      isOpenGalleryPanel: false,
      isOpenVersionPanel: true,
    })),
  closeVersionPanel: () =>
    set(() => ({
      isOpenVersionPanel: false,
    })),
  openOptions: () =>
    set(() => ({
      isOpenGalleryPanel: false,
      isOpenVersionPanel: false,
      isOpenOptions: true,
    })),
  closeOptions: () =>
    set(() => ({
      isOpenOptions: false,
    })),
}))

export const useConfirmBoxStore = create<ConfirmBoxState>((set) => ({
  isOpenConfirm: false,
  ConfirmLabel: '',
  openConfirm: () =>
    set(() => ({
      isOpenGalleryPanel: false,
      isOpenVersionPanel: false,
      isOpenConfirm: true,
    })),
  closeConfirm: () =>
    set(() => ({
      isOpenConfirm: false,
    })),
  setConfirmLabel: (ConfirmLabel: string) =>
    set(() => ({
      ConfirmLabel,
    })),
}))
