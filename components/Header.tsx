// Component Header - Navigation bar cho website
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiPackage, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State cho mobile menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State cho trạng thái đăng nhập
  const [searchQuery, setSearchQuery] = useState(''); // State cho search query

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
  };

  // Xử lý search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Kiểm tra trang hiện tại để highlight
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + '/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo.jpg"
                alt="WIF Shop Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900">WIF Shop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-4"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/products" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/products') 
                  ? 'text-primary-600 font-semibold bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Sản phẩm
              {isActive('/products') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/blogs" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/blogs') 
                  ? 'text-primary-600 font-semibold bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Blog
              {isActive('/blogs') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/tools" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/tools') 
                  ? 'text-primary-600 font-semibold bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Công cụ
              {isActive('/tools') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/guide" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/guide') 
                  ? 'text-primary-600 font-semibold bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Hướng dẫn mua hàng
              {isActive('/guide') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/contact" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/contact') 
                  ? 'text-primary-600 font-semibold bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Liên hệ
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Tra cứu đơn hàng */}
            <Link href="/track-order" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <FiPackage className="w-6 h-6" />
              <span>Tra cứu đơn hàng</span>
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FiUser className="w-6 h-6" />
                  <span>Tài khoản</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                    Hồ sơ
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    Đơn hàng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 pr-4"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/products')
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sản phẩm
              </Link>
              <Link
                href="/blogs"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/blogs')
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/tools"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/tools')
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Công cụ
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/contact')
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Liên hệ
              </Link>
              <Link
                href="/guide"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/guide')
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Hướng dẫn mua hàng
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Tra cứu đơn hàng
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Hồ sơ
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Đơn hàng
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

