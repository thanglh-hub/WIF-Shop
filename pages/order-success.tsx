// Trang thành công sau khi đặt hàng
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Order } from '@/types';
import { FiCheckCircle, FiPackage, FiHome } from 'react-icons/fi';

export default function OrderSuccess() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null); // State cho đơn hàng
  const [loading, setLoading] = useState(true); // State cho loading

  // Fetch order khi id thay đổi
  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  // Hàm fetch order
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-full w-16 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã mua hàng. Chúng tôi sẽ gửi thông tin tài khoản đến email của bạn trong vòng 5-60 phút.
        </p>

        {/* Order Info */}
        {order && (
          <div className="card p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Mã đơn hàng: #{order._id}</h2>
              <div className="badge badge-success">Đang xử lý</div>
            </div>
            <div className="space-y-2 mb-4">
              <p><span className="text-gray-500">Tổng tiền:</span> <span className="font-bold text-primary-600">{formatPrice(order.totalAmount)}</span></p>
              <p><span className="text-gray-500">Email nhận tài khoản:</span> {order.shippingInfo.email}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Bạn có thể tra cứu đơn hàng bằng mã đơn hàng và email tại trang <Link href="/track-order" className="text-primary-600 hover:underline">Tra cứu đơn hàng</Link>.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/track-order" className="btn btn-outline flex items-center justify-center space-x-2">
            <FiPackage className="w-5 h-5" />
            <span>Tra cứu đơn hàng</span>
          </Link>
          <Link href="/" className="btn btn-primary flex items-center justify-center space-x-2">
            <FiHome className="w-5 h-5" />
            <span>Về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

