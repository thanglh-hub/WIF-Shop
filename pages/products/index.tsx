// Products page - Trang danh sách sản phẩm
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AccountCard from '@/components/AccountCard';
import { GameAccount, GameType } from '@/types';
import { FiFilter, FiX } from 'react-icons/fi';

export default function Products() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<GameAccount[]>([]); // State cho danh sách tài khoản
  const [loading, setLoading] = useState(true); // State cho loading
  const [filters, setFilters] = useState({
    gameType: 'all' as GameType | 'all',
    minPrice: '',
    maxPrice: '',
    search: ''
  }); // State cho filters
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  }); // State cho pagination
  const [showFilters, setShowFilters] = useState(false); // State cho mobile filters

  // Fetch accounts khi filters hoặc page thay đổi
  useEffect(() => {
    fetchAccounts();
  }, [router.query, filters]);

  // Hàm fetch accounts
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.gameType !== 'all') params.append('gameType', filters.gameType);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);
      if (router.query.search) params.append('search', router.query.search as string);
      params.append('page', pagination.page.toString());
      params.append('limit', '12');

      const response = await fetch(`/api/accounts?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setAccounts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi filter
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Xử lý reset filters
  const handleResetFilters = () => {
    setFilters({
      gameType: 'all',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Xử lý thay đổi page
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
            
            {/* Game Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Loại game</label>
              <select
                value={filters.gameType}
                onChange={(e) => handleFilterChange('gameType', e.target.value)}
                className="input"
              >
                <option value="all">Tất cả</option>
                <option value="MMORPG">MMORPG</option>
                <option value="FPS">FPS</option>
                <option value="MOBA">MOBA</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Other">Khác</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Khoảng giá</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Từ (VNĐ)"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Đến (VNĐ)"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full btn btn-outline"
            >
              Xóa bộ lọc
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Tất cả sản phẩm</h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn btn-outline flex items-center space-x-2"
              >
                <FiFilter className="w-4 h-4" />
                <span>Bộ lọc</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input pl-10"
              />
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loại game</label>
                  <select
                    value={filters.gameType}
                    onChange={(e) => handleFilterChange('gameType', e.target.value)}
                    className="input"
                  >
                    <option value="all">Tất cả</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="FPS">FPS</option>
                    <option value="MOBA">MOBA</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Khoảng giá</label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Từ (VNĐ)"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Đến (VNĐ)"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="w-full btn btn-outline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Tìm thấy {pagination.total} sản phẩm
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-80 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : accounts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <AccountCard key={account._id} account={account} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="btn btn-outline disabled:opacity-50"
                  >
                    Trước
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.page - 1 && page <= pagination.page + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn ${
                            pagination.page === page
                              ? 'btn-primary'
                              : 'btn-outline'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === pagination.page - 2 ||
                      page === pagination.page + 2
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="btn btn-outline disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 btn btn-primary"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

