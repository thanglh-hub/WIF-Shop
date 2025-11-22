// Trang công cụ tiện ích
'use client';

import { useState } from 'react';
import { FiShield, FiMail, FiKey, FiCopy, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

export default function Tools() {
  const [email, setEmail] = useState(''); // State cho email
  const [otpCode, setOtpCode] = useState(''); // State cho OTP code
  const [loading, setLoading] = useState(false); // State cho loading
  const [result, setResult] = useState<string | null>(null); // State cho kết quả
  const [copied, setCopied] = useState(false); // State cho copy status

  // Xử lý lấy OTP từ email
  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      // Gọi API để lấy OTP từ email
      const response = await fetch('/api/tools/get-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpCode(data.data.code);
        setResult('Đã lấy mã OTP thành công!');
      } else {
        setResult(data.message || 'Không thể lấy mã OTP. Vui lòng thử lại.');
      }
    } catch (error) {
      setResult('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý copy OTP code
  const handleCopy = () => {
    if (otpCode) {
      navigator.clipboard.writeText(otpCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Công cụ tiện ích</h1>
          <p className="text-gray-600 text-lg">
            Các tiện ích hỗ trợ bạn trong quá trình sử dụng tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tool 1: Lấy mã 2FA */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FiShield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Mã 2FA</h2>
                <p className="text-sm text-gray-500">Lấy mã xác thực 2 yếu tố</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Nhập secret key của bạn để lấy mã 2FA hiện tại. Mã sẽ tự động cập nhật mỗi 30 giây.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nhập secret key..."
                className="input"
              />
              <button className="w-full btn btn-primary">
                Lấy mã 2FA
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Mã 2FA:</p>
              <div className="flex items-center justify-between">
                <code className="text-lg font-mono font-bold text-primary-600">000000</code>
                <button
                  onClick={() => navigator.clipboard.writeText('000000')}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <FiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tool 2: Lấy OTP từ email */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiMail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">OTP từ Email</h2>
                <p className="text-sm text-gray-500">Lấy mã OTP từ email</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Nhập địa chỉ email để lấy mã OTP mới nhất từ hộp thư đến.
            </p>
            <form onSubmit={handleGetOTP} className="space-y-3">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  required
                  className="input pl-10"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <FiRefreshCw className="w-5 h-5 animate-spin" />
                    <span>Đang tìm kiếm...</span>
                  </>
                ) : (
                  <>
                    <FiKey className="w-5 h-5" />
                    <span>Lấy mã OTP</span>
                  </>
                )}
              </button>
            </form>

            {/* Kết quả */}
            {result && (
              <div className={`mt-4 p-3 rounded-lg ${
                otpCode ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${otpCode ? 'text-green-800' : 'text-red-800'}`}>
                  {result}
                </p>
              </div>
            )}

            {/* OTP Code */}
            {otpCode && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Mã OTP:</p>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono font-bold text-primary-600">{otpCode}</code>
                  <button
                    onClick={handleCopy}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {copied ? (
                      <FiCheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <FiCopy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tool 3: Password Generator */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiKey className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tạo mật khẩu</h2>
                <p className="text-sm text-gray-500">Tạo mật khẩu mạnh</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Tạo mật khẩu ngẫu nhiên an toàn với độ dài tùy chọn.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Độ dài mật khẩu</label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  defaultValue="16"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8</span>
                  <span>16</span>
                  <span>32</span>
                </div>
              </div>
              <button className="w-full btn btn-outline">
                Tạo mật khẩu
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Mật khẩu:</p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-primary-600">••••••••••••••••</code>
                <button className="text-primary-600 hover:text-primary-700">
                  <FiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tool 4: QR Code Generator */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiKey className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">QR Code</h2>
                <p className="text-sm text-gray-500">Tạo QR code</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Tạo QR code từ text hoặc URL để dễ dàng chia sẻ.
            </p>
            <div className="space-y-3">
              <textarea
                placeholder="Nhập text hoặc URL..."
                rows={3}
                className="input"
              />
              <button className="w-full btn btn-outline">
                Tạo QR Code
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
              <div className="w-32 h-32 bg-white mx-auto rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

