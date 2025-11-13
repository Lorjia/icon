export type ProgressHandler = (p: { loaded: number; total?: number; percent?: number; phase: 'downloading' | 'converting' | 'saving' }) => void

export async function fetchWithProgress(url: string, onProgress?: ProgressHandler): Promise<Blob> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download failed: ${res.status}`)
  const total = Number(res.headers.get('Content-Length') || '') || undefined
  const reader = res.body?.getReader()
  if (!reader) {
    const b = await res.blob()
    onProgress?.({ loaded: b.size, total, percent: total ? Math.round((b.size / total) * 100) : undefined, phase: 'downloading' })
    return b
  }
  const chunks: Uint8Array[] = []
  let loaded = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      chunks.push(value)
      loaded += value.byteLength
      const percent = total ? Math.round((loaded / total) * 100) : undefined
      onProgress?.({ loaded, total, percent, phase: 'downloading' })
    }
  }
  const blob = new Blob(chunks)
  return blob
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

