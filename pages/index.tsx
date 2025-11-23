// Home page - Trang chủ
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AccountCard from '@/components/AccountCard';
import { GameAccount } from '@/types';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const [featuredAccounts, setFeaturedAccounts] = useState<GameAccount[]>([]); // State cho danh sách tài khoản nổi bật
  const [loading, setLoading] = useState(true); // State cho loading
  const [error, setError] = useState<string | null>(null); // State cho error

  // Fetch featured accounts khi component mount
  useEffect(() => {
    fetchFeaturedAccounts();
  }, []);

  // Hàm fetch featured accounts
  const fetchFeaturedAccounts = async () => {
    try {
      setError(null);
      const response = await fetch('/api/accounts?limit=8&status=available');
      const data = await response.json();
      if (data.success) {
        setFeaturedAccounts(data.data);
      } else {
        setError(data.message || 'Không thể tải danh sách sản phẩm');
      }
    } catch (error: any) {
      console.error('Error fetching accounts:', error);
      setError('Lỗi kết nối server. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Sản phẩm nổi bật</h2>
              <p className="text-gray-600">Những tài khoản được yêu thích nhất</p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <span>Xem tất cả</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
          ) : featuredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAccounts.map((account) => (
                <AccountCard key={account._id} account={account} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <p className="text-gray-400 text-sm">
                Vui lòng kiểm tra kết nối với backend API
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Chưa có sản phẩm nào</p>
              <p className="text-gray-400 text-sm">
                Dữ liệu sẽ được lấy từ backend API
              </p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href="/products" className="btn btn-primary">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

