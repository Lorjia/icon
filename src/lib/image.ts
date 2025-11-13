import { ProgressHandler } from '@/lib/download'

export async function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(e)
    }
    img.src = url
  })
}

export function drawToCanvas(img: HTMLImageElement, size?: number): HTMLCanvasElement {
  const w = size || img.naturalWidth
  const h = size || img.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  return canvas
}

export async function convertCanvasToBlob(canvas: HTMLCanvasElement, type: 'image/png' | 'image/jpeg' | 'image/webp', quality?: number): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b || new Blob()), type, quality)
  })
}

function writeUint16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true)
}
function writeUint32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value, true)
}

export async function buildIcoFromPngBlobs(pngBlobs: Blob[]): Promise<Blob> {
  const entries = await Promise.all(pngBlobs.map(async (b) => {
    const array = new Uint8Array(await b.arrayBuffer())
    return array
  }))
  const count = entries.length
  const headerSize = 6 + count * 16
  const totalSize = headerSize + entries.reduce((sum, arr) => sum + arr.byteLength, 0)
  const out = new Uint8Array(totalSize)
  const view = new DataView(out.buffer)
  writeUint16(view, 0, 0)
  writeUint16(view, 2, 1)
  writeUint16(view, 4, count)
  let offset = headerSize
  for (let i = 0; i < count; i++) {
    const arr = entries[i]
    const size = arr.byteLength
    const w = i === 0 ? 16 : i === 1 ? 32 : i === 2 ? 48 : 64
    const h = w
    const base = 6 + i * 16
    out[base + 0] = w
    out[base + 1] = h
    out[base + 2] = 0
    out[base + 3] = 0
    writeUint16(view, base + 4, 1)
    writeUint16(view, base + 6, 32)
    writeUint32(view, base + 8, size)
    writeUint32(view, base + 12, offset)
    out.set(arr, offset)
    offset += size
  }
  return new Blob([out], { type: 'image/x-icon' })
}

export async function convertImageBlob(blob: Blob, format: 'png' | 'jpeg' | 'webp' | 'ico', onProgress?: ProgressHandler): Promise<Blob> {
  onProgress?.({ loaded: 0, phase: 'converting' })
  const img = await blobToImage(blob)
  if (format === 'ico') {
    const sizes = [16, 32, 48]
    const pngs: Blob[] = []
    for (const s of sizes) {
      const canvas = drawToCanvas(img, s)
      const b = await convertCanvasToBlob(canvas, 'image/png')
      pngs.push(b)
    }
    const ico = await buildIcoFromPngBlobs(pngs)
    onProgress?.({ loaded: ico.size, phase: 'converting' })
    return ico
  }
  const type = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp'
  const canvas = drawToCanvas(img)
  const out = await convertCanvasToBlob(canvas, type, format === 'jpeg' ? 0.92 : undefined)
  onProgress?.({ loaded: out.size, phase: 'converting' })
  return out
}

