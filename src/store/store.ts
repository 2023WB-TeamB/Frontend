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
// ? 뷰어 모드
interface ViewerModeState {
  isViewer: boolean;
  toggleViewerMode: () => void;
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

export const useViewerModeStore = create<ViewerModeState>((set) => ({
  isViewer: true,
  toggleViewerMode: () => set((state) => ({
    isViewer: !state.isViewer
  })),
}));

// interface SelectContentState { //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
//   selectContent: number;
//   setSelectContent: (select: number) => void;
// }

// // create를 이용해서 store을 생상헐 수 있으며, 다수의 store도 생성 가능하다.
// export const useStore = create<SelectContentState>((set) => ({
//   // create 함수의 매개변수로 콜백함수를 받는데 이 콜백함수의  return객체에 state,
//   // setState를 넣는다.
//   selectContent: window.localStorage.getItem('select') ?
//   	Number(window.localStorage.getItem('select')) : 0,
//   setSelectContent: (select) => {
//     set((state) => ({ ...state, selectContent: select }));
//   },
// }));
