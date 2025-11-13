import { Menu, X, Download } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Download className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">IconHub</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => document.getElementById('icons')?.scrollIntoView({ behavior: 'smooth' })}
              >
                图标库
              </button>
              <button
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                分类
              </button>
            </div>
          </div>

          {/* Search moved to Hero */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                className="block w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  document.getElementById('icons')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                图标库
              </button>
              <button
                className="block w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                分类
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
