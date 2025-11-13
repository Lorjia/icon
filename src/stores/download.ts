import { create } from 'zustand'

type Status = 'idle' | 'downloading' | 'converting' | 'saving' | 'completed' | 'failed'

interface TaskState {
  status: Status
  percent?: number
}

interface DownloadState {
  tasks: Record<string, TaskState>
  start: (key: string) => void
  update: (key: string, status: Status, percent?: number) => void
  finish: (key: string, ok: boolean) => void
}

export const useDownloadStore = create<DownloadState>((set) => ({
  tasks: {},
  start: (key) => set((s) => ({ tasks: { ...s.tasks, [key]: { status: 'downloading', percent: 0 } } })),
  update: (key, status, percent) => set((s) => ({ tasks: { ...s.tasks, [key]: { status, percent } } })),
  finish: (key, ok) => set((s) => ({ tasks: { ...s.tasks, [key]: { status: ok ? 'completed' : 'failed', percent: 100 } } })),
}))

