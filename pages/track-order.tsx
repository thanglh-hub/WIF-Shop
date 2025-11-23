// Trang tra cứu đơn hàng
'use client';

import { useState } from 'react';
import { FiSearch, FiPackage, FiCheckCircle, FiXCircle, FiClock, FiMail, FiKey } from 'react-icons/fi';
import { Order } from '@/types';

type TrackMethod = 'orderId' | 'email'; // Loại phương thức tra cứu

export default function TrackOrder() {
  const [trackMethod, setTrackMethod] = useState<TrackMethod>('orderId'); // State cho phương thức tra cứu
  const [orderId, setOrderId] = useState(''); // State cho order ID
  const [email, setEmail] = useState(''); // State cho email
  const [otp, setOtp] = useState(''); // State cho mã OTP
  const [otpSent, setOtpSent] = useState(false); // State cho trạng thái đã gửi OTP
  const [sendingOtp, setSendingOtp] = useState(false); // State cho đang gửi OTP
  const [loading, setLoading] = useState(false); // State cho loading
  const [order, setOrder] = useState<Order | null>(null); // State cho đơn hàng
  const [error, setError] = useState<string | null>(null); // State cho error

  // Xử lý gửi OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    setSendingOtp(true);
    setError(null);
    setOtpSent(false);
    setOtp('');

    try {
      // Gọi API để gửi OTP
      const response = await fetch('/api/tools/get-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setError(null);
      } else {
        setError(data.message || 'Không thể gửi mã OTP. Vui lòng thử lại.');
      }
    } catch (error: any) {
      setError('Lỗi khi gửi mã OTP. Vui lòng thử lại.');
    } finally {
      setSendingOtp(false);
    }
  };

  // Xử lý tra cứu đơn hàng
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      let response;
      
      if (trackMethod === 'orderId') {
        // Tra cứu bằng mã đơn hàng
        if (!orderId.trim()) {
          setError('Vui lòng nhập mã đơn hàng');
          setLoading(false);
          return;
        }
        response = await fetch(`/api/orders/track?orderId=${orderId}`);
      } else {
        // Tra cứu bằng email với OTP
        if (!email.trim() || !otp.trim()) {
          setError('Vui lòng nhập đầy đủ thông tin');
          setLoading(false);
          return;
        }
        response = await fetch('/api/orders/track-by-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
        });
      }

      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
        setError(null);
      } else {
        setError(data.message || 'Không tìm thấy đơn hàng');
      }
    } catch (error: any) {
      setError('Lỗi khi tra cứu đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form khi đổi phương thức
  const handleMethodChange = (method: TrackMethod) => {
    setTrackMethod(method);
    setOrderId('');
    setEmail('');
    setOtp('');
    setOtpSent(false);
    setOrder(null);
    setError(null);
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Format ngày tháng
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString('vi-VN');
  };

  // Lấy màu và text cho trạng thái
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: FiCheckCircle, text: 'Hoàn thành' };
      case 'processing':
        return { color: 'text-blue-600', bg: 'bg-blue-100', icon: FiClock, text: 'Đang xử lý' };
      case 'cancelled':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: FiXCircle, text: 'Đã hủy' };
      default:
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FiClock, text: 'Chờ xử lý' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Tra cứu đơn hàng</h1>

        {/* Form tra cứu */}
        <div className="card p-6 mb-8">
          {/* Chọn phương thức tra cứu */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Phương thức tra cứu:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleMethodChange('orderId')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  trackMethod === 'orderId'
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FiPackage className="w-5 h-5" />
                  <span className="font-medium">Mã đơn hàng</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleMethodChange('email')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  trackMethod === 'email'
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FiMail className="w-5 h-5" />
                  <span className="font-medium">Email</span>
                </div>
              </button>
            </div>
          </div>

          {/* Form tra cứu bằng mã đơn hàng */}
          {trackMethod === 'orderId' && (
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mã đơn hàng</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Nhập mã đơn hàng"
                  required
                  className="input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center space-x-2"
              >
                <FiSearch className="w-5 h-5" />
                <span>{loading ? 'Đang tìm kiếm...' : 'Tra cứu'}</span>
              </button>
            </form>
          )}

          {/* Form tra cứu bằng email với OTP */}
          {trackMethod === 'email' && (
            <div className="space-y-4">
              {/* Bước 1: Nhập email và gửi OTP */}
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email đã đặt hàng"
                      required
                      className="input"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mã OTP sẽ được gửi đến email này
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={sendingOtp}
                    className="w-full btn btn-primary flex items-center justify-center space-x-2"
                  >
                    <FiMail className="w-5 h-5" />
                    <span>{sendingOtp ? 'Đang gửi...' : 'Gửi mã OTP'}</span>
                  </button>
                </form>
              ) : (
                /* Bước 2: Nhập OTP và tra cứu */
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700">
                      <FiCheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Mã OTP đã được gửi đến {email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mã OTP</label>
                    <div className="relative">
                      <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Nhập mã OTP (6 chữ số)"
                        required
                        maxLength={6}
                        className="input pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Vui lòng kiểm tra email và nhập mã OTP
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                      }}
                      className="flex-1 btn btn-outline"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
                    >
                      <FiSearch className="w-5 h-5" />
                      <span>{loading ? 'Đang tìm kiếm...' : 'Tra cứu'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Kết quả tra cứu */}
        {error && (
          <div className="card p-6 bg-red-50 border border-red-200">
            <div className="flex items-center space-x-2 text-red-600">
              <FiXCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {order && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Đơn hàng #{order._id}</h2>
              {(() => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="font-medium">{statusInfo.text}</span>
                  </div>
                );
              })()}
            </div>

            {/* Thông tin đơn hàng */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">Ngày đặt:</span>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phương thức thanh toán:</span>
                <p className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Thông tin giao hàng:</span>
                <p className="font-medium">{order.shippingInfo.fullName}</p>
                <p className="text-gray-600">{order.shippingInfo.email}</p>
                <p className="text-gray-600">{order.shippingInfo.phone}</p>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="border-t pt-4 mb-4">
              <h3 className="font-bold mb-3">Sản phẩm đã mua:</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="border-t pt-4 flex items-center justify-between">
              <span className="text-lg font-bold">Tổng tiền:</span>
              <span className="text-2xl font-bold text-primary-600">{formatPrice(order.totalAmount)}</span>
            </div>

            {order.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Ghi chú:</span>
                <p className="mt-1">{order.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

