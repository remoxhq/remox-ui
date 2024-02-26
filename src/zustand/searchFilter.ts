import { create } from 'zustand'

interface IProps{
    searchExplore: string
    searchFavorites: string
    searchCreations: string
    setSearchExplore:(by: string) => void
    setSearchFavorites:(by: string) => void
    setSearchCreations:(by: string) => void
}
export const useSearchFilter = create<IProps>((set) => ({
  searchExplore: '',
  searchFavorites:'',
  searchCreations:'',
  setSearchExplore:(by) => set({ searchExplore: by }),
  setSearchFavorites:(by) => set({ searchFavorites: by }),
  setSearchCreations:(by) => set({ searchCreations: by }),
  
}))