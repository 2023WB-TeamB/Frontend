import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Editor } from '@tiptap/react'
import { projectData } from '../components/ViewEdit/Sidebar/SidebarPanel'

export type Keyword = {
  name: string
}

export type DocData = {
  id: number
  title: string
  created_at: string
  color: string
  repository_url: string
  keywords: Keyword[]
}

// 문서 데이터
export type Doc = {
  id: number
  title: string
  created_at: string
  color: string
  repo: string
  tags: string[]
  keywords?: Keyword[]
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

// 문서 불러오는 상태 여부
interface IsLoading {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const isLoadingStore = create<IsLoading>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}))

// 생성할 문서 언어
interface Language {
  isEnglish: boolean
  setIsEnglish: (isEnglish: boolean) => void
}

export const isEnglishStore = create<Language>((set) => ({
  isEnglish: false,
  setIsEnglish: (isEnglish) => set({ isEnglish }),
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
  modalContent: {
    id: number
    title: string
    created_at: string
    color: string
    repo: string
    tags: string[]
  } | null
  setModalContent: (
    content: {
      id: number
      title: string
      created_at: string
      color: string
      repo: string
      tags: string[]
    } | null,
  ) => void
}

export const modalContentStore = create<modalContent>((set) => ({
  modalContent: null,
  setModalContent: (content) => set(() => ({ modalContent: content })),
}))

// 프리뷰 상태
interface Preview {
  previewOpen: boolean
  setPreviewOpen: (modalOpen: boolean) => void
}

export const previewOpenStore = create<Preview>((set) => ({
  previewOpen: false,
  setPreviewOpen: (previewOpen) => set({ previewOpen }),
}))

// 프리뷰 내용
interface PreviewContent {
  previewContent: {
    id: number
    title: string
    created_at: string
    color: string
    content: string
    repo: string
    tags: string[]
  } | null
  setPreviewContent: (
    content: {
      id: number
      title: string
      created_at: string
      color: string
      content: string
      repo: string
      tags: string[]
    } | null,
  ) => void
}

export const previewContentStore = create<PreviewContent>((set) => ({
  previewContent: null,
  setPreviewContent: (content) => set(() => ({ previewContent: content })),
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

type Notification = {
  notification: string | null
  setNotification: (message: string) => void
  clearNotification: () => void
}

export const notificationStore = create<Notification>((set) => ({
  notification: null,
  setNotification: (message: any) => set(() => ({ notification: message })),
  clearNotification: () => set(() => ({ notification: null })),
}))

/* 다크모드 */
interface State {
  $isDarkMode: boolean
  toggleDarkMode: () => void
}

export const useDarkModeStore = create<State>(
  persist(
    (set) => ({
      $isDarkMode: false,
      toggleDarkMode: () => set((state: State) => ({ $isDarkMode: !state.$isDarkMode })),
    }),
    {
      name: 'dark-mode',
    },
  ) as any,
)

// * 뷰어/에디터 상태
// ? 사이드바 고정 상태
interface SidePeekState {
  isOpenSideAlways: boolean
  toggleOpenSideAlways: () => void
}

export const useSidePeekStore = create<SidePeekState>((set) => ({
  isOpenSideAlways: true,
  toggleOpenSideAlways: () =>
    set((state) => ({
      isOpenSideAlways: !state.isOpenSideAlways,
    })),
}))

// ? 사이드바 기능 여부 상태
interface ViewerPageOpenState {
  isOpenGalleryPanel: boolean
  isOpenVersionPanel: boolean
  isOpenOptions: boolean
  openGalleryPanel: () => void
  openVersionPanel: () => void
  closeSidePanel: () => void
  openOptions: () => void
  closeOptions: () => void
}
export const useViewerPageOpenStore = create<ViewerPageOpenState>((set) => ({
  isOpenGalleryPanel: false,
  isOpenVersionPanel: false,
  isOpenOptions: false,
  openGalleryPanel: () =>
    set(() => ({
      isOpenVersionPanel: false,
      isOpenGalleryPanel: true,
    })),
  openVersionPanel: () =>
    set(() => ({
      isOpenGalleryPanel: false,
      isOpenVersionPanel: true,
    })),
  closeSidePanel: () =>
    set(() => ({
      isOpenGalleryPanel: false,
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

// ? 확인 모달창
interface ConfirmBoxState {
  isOpenConfirm: boolean
  confirmLabel: string
  confirmAction: () => void
  setConfirmAction: (newConfirmAction: () => void) => void
  openConfirm: () => void
  closeConfirm: () => void
  setConfirmLabel: (label: string) => void
}
export const useConfirmBoxStore = create<ConfirmBoxState>((set) => ({
  isOpenConfirm: false,
  confirmLabel: '',
  confirmAction: () => {},
  setConfirmAction: (confirmAction) =>
    set(() => ({
      confirmAction,
    })),
  openConfirm: () =>
    set(() => ({
      isOpenConfirm: true,
    })),
  closeConfirm: () =>
    set(() => ({
      isOpenConfirm: false,
    })),
  setConfirmLabel: (confirmLabel) =>
    set(() => ({
      confirmLabel,
    })),
}))

// ? 편집 모드
interface EditorModeState {
  isEditor: boolean
  toggleEditorMode: () => void
}
export const useEditorModeStore = create<EditorModeState>((set) => ({
  isEditor: false,
  toggleEditorMode: () =>
    set((state) => ({
      isEditor: !state.isEditor,
    })),
}))

// ? 문서 내용
interface DocContentState {
  title: string
  content: string
  color: string
  setTitle: (value: string) => void
  setContent: (value: string) => void
  setColor: (value: string) => void
}
export const useDocContentStore = create<DocContentState>((set) => ({
  title: '',
  content: '',
  color: '#fff',
  setTitle: (value: string) =>
    set(() => ({
      title: value,
    })),
  setContent: (value: string) =>
    set(() => ({
      content: value,
    })),
  setColor: (value: string) =>
    set(() => ({
      color: value,
    })),
}))

// ? 문서 태그
interface DocTagState {
  tags: Array<string>
  setTag: (list: string[]) => void
  addTag: (newTag: string) => void
  removeTag: (index: number) => void
}
export const useDocTagStore = create<DocTagState>((set) => ({
  tags: [],
  setTag: (list: string[]) =>
    set(() => ({
      tags: list,
    })),
  addTag: (newTag: string) =>
    set((state) => {
      if (state.tags.includes(newTag)) {
        return {
          tags: state.tags,
        }
      }
      return {
        tags: [...state.tags, newTag],
      }
    }),
  removeTag: (index: number) =>
    set((state) => ({
      tags: state.tags.filter((_, i) => i !== index),
    })),
}))

// ? 에디터 객체
interface EditorObjectState {
  editor: Editor | null
  setEditor: (editor: Editor | null) => void
}
export const useEditorObjectStore = create<EditorObjectState>((set) => ({
  editor: null,
  setEditor: (editor) => set(() => ({ editor })),
}))

// ? PDF 다운로드 컴포넌트 활성 상태
// interface DownloadComponentState {
//   isRender: boolean
//   enableIsRender: () => void
//   disableIsRender: () => void
// }
// export const useDownloadComponentStore = create<DownloadComponentState>((set) => ({
//   isRender: false,
//   enableIsRender: () => set(() => ({ isRender: true })),
//   disableIsRender: () => set(() => ({ isRender: false })),
// }))

// ? 현재 문서 ID
interface DocIdState {
  docId: number | null
  setDocId: (id: number) => void
}
export const useDocIdStore = create<DocIdState>((set) => ({
  docId: localStorage.getItem('docId') ? parseInt(localStorage.getItem('docId')!, 10) : null,
  setDocId: (id) => {
    set(() => ({ docId: id }))
    localStorage.setItem('docId', id.toString())
  },
}))

interface ApiUrlState {
  apiUrl: string
  docsApiUrl: string
  authApiUrl: string
  registerApiUrl: string
  setApiUrl: (url: string) => void
}
export const useApiUrlStore = create<ApiUrlState>((set) => ({
  apiUrl: 'https://gitodoc.kro.kr/api/v1',
  // apiUrl: 'http://localhost:8000/api/v1',
  docsApiUrl: '',
  authApiUrl: '',
  registerApiUrl: '',
  setApiUrl: (url: string) => set((state) => ({ ...state, apiUrl: url })),
}));

// API 초기값 설정
const store = useApiUrlStore.getState();
const {apiUrl} = store;
useApiUrlStore.setState({
  docsApiUrl: `${apiUrl}/docs`,
  authApiUrl: `${apiUrl}/auth`,
  registerApiUrl: `${apiUrl}/register`,
});

// BadgeGuide Modal
interface GuideStore {
  isGuideOpen: boolean
  openGuide: () => void
  closeGuide: () => void
}

export const useGuideStore = create<GuideStore>((set) => ({
  isGuideOpen: false,
  openGuide: () => set({ isGuideOpen: true }),
  closeGuide: () => set({ isGuideOpen: false }),
}))

interface SidePanelSearchState {
  searchTemp: projectData[]
  setSearchTemp: (data: projectData[]) => void
}
export const useSidePanelSearchStore = create<SidePanelSearchState>((set) => ({
  searchTemp: [],
  setSearchTemp: (data: projectData[]) =>
    set(() => ({
      searchTemp: data,
    })),
}))
