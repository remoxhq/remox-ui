import { create } from 'zustand'

interface IProps{
    chainExplore: string
    chainFavorites: string
    chainCreations: string
    setChainExplore:(by: string) => void
    setChainFavorites:(by: string) => void
    setChainCreations:(by: string) => void
}
export const useChainFilter = create<IProps>((set) => ({
  chainExplore: '',
  chainFavorites:'',
  chainCreations:'',
  setChainExplore:(by) => set({ chainExplore: by === "all" ? '': by }),
  setChainFavorites:(by) => set({ chainFavorites: by === "all" ? '': by }),
  setChainCreations:(by) => set({ chainCreations: by === "all" ? '': by })
  
}))