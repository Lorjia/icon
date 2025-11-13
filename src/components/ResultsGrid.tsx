import { useSearchStore } from '@/stores/search'
import { useFavoritesStore } from '@/stores/favorites'
import { Download, Heart } from 'lucide-react'
import { fetchWithProgress, saveBlob } from '@/lib/download'
import { convertImageBlob } from '@/lib/image'
import { useDownloadStore } from '@/stores/download'
import { useToastStore } from '@/components/Toast'
import { useState, useMemo } from 'react'

type Format = 'png' | 'jpeg' | 'webp' | 'ico'

const formatLabels: Record<Format, string> = {
  png: 'PNG',
  jpeg: 'JPEG',
  webp: 'WebP',
  ico: 'ICO',
}

const ResultsGrid = () => {
  const { results, loading, error, term } = useSearchStore()
  const toggleFav = useFavoritesStore((s) => s.toggle)
  const isFav = useFavoritesStore((s) => s.isFavorite)
  const favItems = useFavoritesStore((s) => s.items)
  const [onlyFav, setOnlyFav] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  const updateTask = useDownloadStore((s) => s.update)
  const startTask = useDownloadStore((s) => s.start)
  const finishTask = useDownloadStore((s) => s.finish)
  const tasks = useDownloadStore((s) => s.tasks)
  const toast = useToastStore((s) => s.show)

  async function handleDownload(artUrl: string | undefined, name: string, format: Format, trackId: number) {
    if (!artUrl) return
    const key = `${trackId}:${format}`
    startTask(key)
    try {
      const blob = await fetchWithProgress(artUrl, (p) => {
        const percent = p.percent ?? undefined
        updateTask(key, 'downloading', percent)
      })
      updateTask(key, 'converting', tasks[key]?.percent)
      const out = await convertImageBlob(blob, format, (p) => {
        updateTask(key, 'converting', p.percent ?? tasks[key]?.percent)
      })
      updateTask(key, 'saving', 100)
      const safeName = name.replace(/[\\/:*?"<>|]/g, '')
      saveBlob(out, `${safeName}.${format}`)
      finishTask(key, true)
      toast('success', '下载完成')
    } catch (e) {
      finishTask(key, false)
      toast('error', '下载失败')
    }
  }

  const list = onlyFav ? favItems : results
  const categories = useMemo(() => {
    const set = new Set<string>()
    list.forEach((item) => {
      const gs = (item as any).genres || ((item as any).primaryGenreName ? [(item as any).primaryGenreName] : [])
      gs.forEach((g: string) => set.add(g))
    })
    return ['全部', ...Array.from(set)]
  }, [list])
  const filteredList = useMemo(() => {
    if (selectedCategory === '全部') return list
    return list.filter((item) => {
      const gs = (item as any).genres || ((item as any).primaryGenreName ? [(item as any).primaryGenreName] : [])
      return gs.includes(selectedCategory)
    })
  }, [list, selectedCategory])
  if (loading) return <div className="text-center py-10 text-gray-600">正在搜索 “{term}”...</div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>
  if (!filteredList.length) return <div className="text-center py-10 text-gray-500">暂无结果</div>

  return (
    <section id="icons" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="categories" className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-600">{onlyFav ? '只看收藏' : '搜索结果'}</div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={onlyFav} onChange={(e) => setOnlyFav(e.target.checked)} />
              只看收藏
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`${selectedCategory === c ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-2 rounded-full text-sm`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredList.map((item) => (
            <div key={item.trackId} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={item.artworkUrl512 || item.artworkUrl100 || item.artworkUrl60}
                  alt={item.trackName}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg border ${isFav(item.trackId) ? 'bg-pink-100 border-pink-300 text-pink-600' : 'hover:bg-gray-100 border-gray-200 text-gray-700'}`}
                    onClick={() => toggleFav(item)}
                    title={isFav(item.trackId) ? '取消收藏' : '收藏'}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <a href={item.trackViewUrl} target="_blank" className="text-sm text-blue-600 hover:underline">App Store</a>
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2">{item.trackName}</h3>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {(['png','jpeg','webp','ico'] as Format[]).map((fmt) => (
                    <button
                      key={fmt}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                      onClick={() => handleDownload(item.artworkUrl512 || item.artworkUrl100 || item.artworkUrl60, item.trackName, fmt, item.trackId)}
                    >
                      <Download className="w-4 h-4" />
                      {formatLabels[fmt]}
                    </button>
                  ))}
                </div>
                <div className="w-full h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                  {(() => {
                    const t = tasks[`${item.trackId}:png`] || tasks[`${item.trackId}:jpeg`] || tasks[`${item.trackId}:webp`] || tasks[`${item.trackId}:ico`]
                    const percent = t?.percent ?? 0
                    return <div className="h-full bg-blue-600 transition-all" style={{ width: `${percent || 0}%` }} />
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultsGrid
