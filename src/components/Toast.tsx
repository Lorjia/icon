import { create } from 'zustand'

type ToastKind = 'success' | 'error' | 'info'

interface ToastItem { id: string; kind: ToastKind; message: string }
interface ToastState {
  items: ToastItem[]
  show: (kind: ToastKind, message: string) => void
  remove: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  show: (kind, message) => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ items: [...s.items, { id, kind, message }] }))
    setTimeout(() => {
      set((s) => ({ items: s.items.filter((t) => t.id !== id) }))
    }, 3000)
  },
  remove: (id) => set((s) => ({ items: s.items.filter((t) => t.id !== id) })),
}))

const Toast = () => {
  const items = useToastStore((s) => s.items)
  const remove = useToastStore((s) => s.remove)
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
      {items.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded-lg shadow text-white ${t.kind === 'success' ? 'bg-green-600' : t.kind === 'error' ? 'bg-red-600' : 'bg-gray-900'}`}
          onClick={() => remove(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

export default Toast

