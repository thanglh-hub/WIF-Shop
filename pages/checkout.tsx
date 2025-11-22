// Trang checkout - Mua ngay
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GameAccount, PaymentMethod } from '@/types';
import { FiCheckCircle, FiMail, FiTag } from 'react-icons/fi';

export default function Checkout() {
  const router = useRouter();
  const { accountId, quantity: qtyParam } = router.query;
  const [account, setAccount] = useState<GameAccount | null>(null); // State cho tài khoản
  const [loading, setLoading] = useState(true); // State cho loading
  const [submitting, setSubmitting] = useState(false); // State cho submitting
  const [quantity, setQuantity] = useState(1); // State cho số lượng
  const [email, setEmail] = useState(''); // State cho email
  const [phone, setPhone] = useState(''); // State cho số điện thoại
  const [fullName, setFullName] = useState(''); // State cho họ tên
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer'); // State cho phương thức thanh toán
  const [discountCode, setDiscountCode] = useState(''); // State cho mã giảm giá
  const [notes, setNotes] = useState(''); // State cho ghi chú

  // Fetch account khi accountId thay đổi
  useEffect(() => {
    if (accountId) {
      fetchAccount();
      if (qtyParam) {
        setQuantity(Number(qtyParam));
      }
    }
  }, [accountId, qtyParam]);

  // Hàm fetch account
  const fetchAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/accounts/${accountId}`);
      const data = await response.json();
      if (data.success) {
        setAccount(data.data);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching account:', error);
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đặt hàng
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Tạo đơn hàng (không yêu cầu đăng nhập cho hệ thống nội bộ)
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            accountId: account?._id,
            title: account?.title,
            price: account?.price,
            quantity: quantity
          }],
          paymentMethod,
          shippingInfo: {
            fullName,
            email,
            phone
          },
          notes
        })
      });

      const data = await response.json();

      if (data.success) {
        // Chuyển đến trang thành công
        router.push(`/order-success?id=${data.data._id}`);
      } else {
        alert(data.message || 'Có lỗi xảy ra khi đặt hàng');
      }
    } catch (error: any) {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Tính tổng tiền
  const totalPrice = account ? account.price * quantity : 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm</p>
        <button onClick={() => router.push('/products')} className="btn btn-primary">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <form onSubmit={handleOrder} className="space-y-6">
          {/* Thông tin sản phẩm */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">{account.title}</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Giá:</span>
              <span className="text-xl font-bold text-primary-600">{formatPrice(account.price)}</span>
            </div>
            
            {/* Số lượng */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Số lượng</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(account.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
                <span className="text-sm text-gray-500">
                  Tối đa {account.stock}. Giá cập nhật theo số lượng.
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Tổng tiền:</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin nhận hàng</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Họ và tên *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email nhận tài khoản *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input pl-10"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Mã giảm giá */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Mã giới thiệu / Giảm giá (tùy chọn)</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Nhập mã"
                className="input flex-1"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => alert('Tính năng đang phát triển')}
              >
                Áp dụng
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Nhập mã và bấm Áp dụng để kiểm tra.</p>
          </div>

          {/* Ghi chú */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Ghi chú cho người bán (tùy chọn)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="input"
              placeholder="Ví dụ: Gửi tài khoản US region, bắt đầu bằng ngày mai..."
            />
            <p className="text-sm text-gray-500 mt-2">Chúng tôi sẽ cố gắng đáp ứng yêu cầu của bạn.</p>
          </div>

          {/* Phương thức thanh toán */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-4 h-4"
                />
                <span>Chuyển khoản ngân hàng</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-4 h-4"
                />
                <span>Ví MoMo</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="zalopay"
                  checked={paymentMethod === 'zalopay'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-4 h-4"
                />
                <span>ZaloPay</span>
              </label>
            </div>
          </div>

          {/* Nút đặt hàng */}
          <button
            type="submit"
            disabled={submitting || account.stock < quantity}
            className="w-full btn btn-primary text-lg py-4 disabled:opacity-50"
          >
            {submitting ? 'Đang xử lý...' : `Mua ngay (${formatPrice(totalPrice)})`}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Đây là sản phẩm dạng Order: thời gian chuẩn bị và gửi có thể mất 5-60 phút sau thanh toán.
          </p>
        </form>
      </div>
    </div>
  );
}

