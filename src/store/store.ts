import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Language {
  isEnglish: boolean
  setIsEnglish: (isEnglish: boolean) => void
}

export const isEnglishStore = create<Language>((set) => ({
  isEnglish: false,
  setIsEnglish: (isEnglish) => set(() => ({ isEnglish: isEnglish })),
}))

interface Modal {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
}

export const modalOpenStore = create<Modal>((set) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
}))

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

interface CardId {
  cardId: number
  setCardId: (cardId: number) => void
}

export const cardIdStore = create<CardId>((set) => ({
  cardId: 0,
  setCardId: (cardId) => set({ cardId }),
}))

interface CardColor {
  cardColor: string
  setCardColor: (cardColor: string) => void
}

export const cardColorStore = create<CardColor>((set) => ({
  cardColor: 'black',
  setCardColor: (cardColor) => set({ cardColor }),
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
  isOpenSideAlways: boolean;
  toggleOpenSideAlways: () => void
}
interface ViewerPageOpenState {
  isOpenGalleryPanel: boolean;
  isOpenVersionPanel: boolean;
  isOpenOptions: boolean;
  openGalleryPanel: () => void;
  closeGalleryPanel: () => void;
  openVersionPanel: () => void;
  closeVersionPanel: () => void;
  openOptions: () => void;
  closeOptions: () => void;
}
interface ConfirmBoxState {
  isOpenConfirm: boolean;
  ConfirmLabel: string;
  openConfirm: () => void;
  closeConfirm: () => void;
  setConfirmLabel: (label:string) => void;
}

export const useSidePeekStore = create<SidePeekState>((set) => ({
  isOpenSideAlways: false,
  toggleOpenSideAlways: () => set((state) => ({ 
    isOpenSideAlways: !state.isOpenSideAlways 
  }))
}))

export const useViewerPageOpenStore = create<ViewerPageOpenState>((set) => ({
  isOpenGalleryPanel: false,
  isOpenVersionPanel: false,
  isOpenOptions: false,
  openGalleryPanel: () => set(() => ({ 
    isOpenVersionPanel: false,
    isOpenGalleryPanel: true 
  })),
  closeGalleryPanel: () => set(() => ({ 
    isOpenGalleryPanel: false
  })),
  openVersionPanel: () => set(() => ({
    isOpenGalleryPanel: false,
    isOpenVersionPanel: true
  })),
  closeVersionPanel: () => set(() => ({
    isOpenVersionPanel: false
  })),
  openOptions: () => set(() => ({
    isOpenGalleryPanel: false,
    isOpenVersionPanel: false,
    isOpenOptions: true
  })),
  closeOptions: () => set(() => ({
    isOpenOptions: false
  })),
}));

export const useConfirmBoxStore = create<ConfirmBoxState>((set) => ({
  isOpenConfirm: false,
  ConfirmLabel: '',
  openConfirm: () => set(() => ({
    isOpenGalleryPanel: false,
    isOpenVersionPanel: false,
    isOpenConfirm: true
  })),
  closeConfirm: () => set(() => ({
    isOpenConfirm: false
  })),
  setConfirmLabel: (ConfirmLabel: string) => set(() => ({ 
    ConfirmLabel 
  })),
}));
