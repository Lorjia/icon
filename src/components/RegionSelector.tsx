import { useSearchStore } from '@/stores/search'

const RegionSelector = () => {
  const country = useSearchStore((s) => s.country)
  const entity = useSearchStore((s) => s.entity)
  const setCountry = useSearchStore((s) => s.setCountry)
  const setEntity = useSearchStore((s) => s.setEntity)
  const search = useSearchStore((s) => s.search)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value as any)}
        className="px-3 py-2 border border-gray-300 rounded-lg"
      >
        <option value="CN">中国</option>
        <option value="US">美国</option>
        <option value="JP">日本</option>
        <option value="KR">韩国</option>
      </select>
      <select
        value={entity}
        onChange={(e) => setEntity(e.target.value as any)}
        className="px-3 py-2 border border-gray-300 rounded-lg"
      >
        <option value="software">iPhone</option>
        <option value="iPadSoftware">iPad</option>
        <option value="macSoftware">Mac</option>
      </select>
      <button onClick={search} className="px-4 py-2 bg-blue-600 text-white rounded-lg">搜索</button>
    </div>
  )
}

export default RegionSelector

