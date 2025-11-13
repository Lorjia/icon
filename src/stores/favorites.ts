import { create } from 'zustand'
import type { ItunesAppItem } from '@/services/itunes'

const STORAGE_KEY = 'iconhub:favorites'

function loadInitial(): ItunesAppItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

interface FavoritesState {
  items: ItunesAppItem[]
  toggle: (item: ItunesAppItem) => void
  isFavorite: (id: number) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: loadInitial(),
  toggle: (item) => {
    const { items } = get()
    const exists = items.some((x) => x.trackId === item.trackId)
    const next = exists ? items.filter((x) => x.trackId !== item.trackId) : [item, ...items]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    set({ items: next })
  },
  isFavorite: (id) => get().items.some((x) => x.trackId === id),
  clear: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ items: [] })
  },
}))

