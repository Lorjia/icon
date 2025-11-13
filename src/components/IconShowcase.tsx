import { useState } from 'react'
import { Download, Heart, Eye } from 'lucide-react'

const IconShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '科技', '商业', '设计', '生活', '教育', '医疗']
  
  const sampleIcons = [
    { id: 1, name: '手机应用', category: '科技', icon: '📱', downloads: 1250, likes: 89 },
    { id: 2, name: '数据分析', category: '商业', icon: '📊', downloads: 890, likes: 67 },
    { id: 3, name: '创意设计', category: '设计', icon: '🎨', downloads: 2100, likes: 145 },
    { id: 4, name: '云端存储', category: '科技', icon: '☁️', downloads: 1580, likes: 102 },
    { id: 5, name: '团队合作', category: '商业', icon: '👥', downloads: 950, likes: 78 },
    { id: 6, name: '在线学习', category: '教育', icon: '📚', downloads: 1340, likes: 91 },
    { id: 7, name: '健康医疗', category: '医疗', icon: '🏥', downloads: 760, likes: 54 },
    { id: 8, name: '生活方式', category: '生活', icon: '🌟', downloads: 1820, likes: 123 },
    { id: 9, name: '电子商务', category: '商业', icon: '🛒', downloads: 1680, likes: 118 },
    { id: 10, name: '人工智能', category: '科技', icon: '🤖', downloads: 2250, likes: 167 },
    { id: 11, name: '社交媒体', category: '生活', icon: '💬', downloads: 1420, likes: 98 },
    { id: 12, name: '环境保护', category: '生活', icon: '🌱', downloads: 980, likes: 72 }
  ]

  const filteredIcons = selectedCategory === '全部' 
    ? sampleIcons 
    : sampleIcons.filter(icon => icon.category === selectedCategory)

  return (
    <section id="icons" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            精选图标展示
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索我们最受欢迎的图标集合，涵盖各种类别和风格，所有图标都经过精心设计，适合各种项目需求
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIcons.map((icon) => (
            <div
              key={icon.id}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon Display */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  {icon.icon}
                </div>
                
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {icon.name}
                </h3>
                
                {/* Stats */}
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{icon.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{icon.likes}</span>
                  </div>
                </div>
                
                {/* Download Button */}
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  <Download className="w-4 h-4" />
                  <span>下载</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            查看更多精美图标，发现适合你项目的完美图标
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            浏览完整图标库
            <Download className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Features Row */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">多种格式</h3>
            <p className="text-gray-600">支持 SVG、PNG、JPG 等多种格式下载</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">高质量</h3>
            <p className="text-gray-600">所有图标均为高质量设计，可无限放大</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">免费商用</h3>
            <p className="text-gray-600">所有图标均可免费用于商业项目</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IconShowcase