import { Download, Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: '图标库', href: '#icons' },
    { name: '分类浏览', href: '#categories' },
    { name: '最新图标', href: '#new' },
    { name: '热门下载', href: '#popular' }
  ]

  const resources = [
    { name: '使用教程', href: '#tutorial' },
    { name: '设计规范', href: '#guidelines' },
    { name: 'API 文档', href: '#api' },
    { name: '博客', href: '#blog' }
  ]

  const support = [
    { name: '帮助中心', href: '#help' },
    { name: '联系我们', href: '#contact' },
    { name: '反馈建议', href: '#feedback' },
    { name: '服务条款', href: '#terms' }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#github' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Download className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">IconHub</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              为设计师和开发者提供最优质的图标资源。我们的使命是让每个人都能轻松找到完美的图标，创造出色的数字体验。
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">订阅我们的更新</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="输入你的邮箱地址"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200">
                  订阅
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">支持</h4>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@iconhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+86 400-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>北京市朝阳区</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <h4 className="text-lg font-semibold mb-4">热门分类</h4>
          <div className="flex flex-wrap gap-2">
            {['科技图标', '商业图标', '设计图标', '生活图标', '教育图标', '医疗图标', '社交图标', '金融图标'].map((category) => (
              <a
                key={category}
                href={`#${category}`}
                className="px-4 py-2 bg-gray-800 hover:bg-blue-600 rounded-lg text-sm transition-colors duration-200"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 IconHub. 保留所有权利。
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors duration-200">
                隐私政策
              </a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">
                服务条款
              </a>
              <a href="#cookies" className="hover:text-white transition-colors duration-200">
                Cookie 政策
              </a>
              <a href="#license" className="hover:text-white transition-colors duration-200">
                许可协议
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer