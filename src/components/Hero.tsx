import { ArrowRight, Sparkles, Palette, Zap, Search as SearchIcon } from 'lucide-react'
import { useSearchStore } from '@/stores/search'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                超过 50,000+ 精美图标
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                发现完美的
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  图标
                </span>
                为你的项目
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                从简洁的线条图标到精美的3D图标，我们为设计师和开发者提供最全面的图标库。
                支持多种格式，免费下载，商用无忧。
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">多种风格</p>
                  <p className="text-sm text-gray-600">线框、填充、3D</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">快速下载</p>
                  <p className="text-sm text-gray-600">一键下载</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">商用授权</p>
                  <p className="text-sm text-gray-600">免费商用</p>
                </div>
              </div>
            </div>

            <HeroSearch />

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">图标数量</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100K+</p>
                <p className="text-sm text-gray-600">设计师使用</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">用户评分</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="grid grid-cols-4 gap-4">
                {/* Sample icons grid */}
                {[...Array(16)].map((_, i) => {
                  const icons = ['📱', '💻', '🎨', '🔧', '🚀', '📊', '🎯', '💡', '🔒', '⚡', '🌟', '📈', '🎮', '🎵', '📱', '💎']
                  const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100', 'bg-indigo-100']
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 ${colors[i % colors.length]} rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer`}
                    >
                      {icons[i]}
                    </div>
                  )
                })}
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                免费下载
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

const HeroSearch = () => {
  const term = useSearchStore((s) => s.term)
  const setTerm = useSearchStore((s) => s.setTerm)
  const search = useSearchStore((s) => s.search)
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1 min-w-[260px]">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="请输入应用名称进行搜索"
          className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await search()
              const el = document.getElementById('icons')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        />
      </div>
      <button
        onClick={async () => {
          await search()
          const el = document.getElementById('icons')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        开始浏览图标
        <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  )
}
