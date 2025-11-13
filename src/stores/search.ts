import { create } from 'zustand'
import { searchItunes, CountryCode, SoftwareEntity, ItunesAppItem } from '@/services/itunes'

interface SearchState {
  term: string
  country: CountryCode
  entity: SoftwareEntity
  limit: number
  loading: boolean
  error?: string
  results: ItunesAppItem[]
  setTerm: (t: string) => void
  setCountry: (c: CountryCode) => void
  setEntity: (e: SoftwareEntity) => void
  search: () => Promise<void>
}

export const useSearchStore = create<SearchState>((set, get) => ({
  term: '',
  country: 'CN',
  entity: 'software',
  limit: 50,
  loading: false,
  results: [],
  setTerm: (t) => set({ term: t }),
  setCountry: (c) => set({ country: c }),
  setEntity: (e) => set({ entity: e }),
  search: async () => {
    const { term, country, entity, limit } = get()
    if (!term.trim()) return set({ results: [], error: undefined })
    set({ loading: true, error: undefined })
    try {
      const results = await searchItunes(term.trim(), country, entity, limit)
      set({ results, loading: false })
    } catch (e: any) {
      set({ error: e?.message || '搜索失败', loading: false })
    }
  },
}))

