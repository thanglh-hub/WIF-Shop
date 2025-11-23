// Trang công cụ tiện ích
'use client';

import { useState, useEffect } from 'react';
import { FiShield, FiKey, FiCopy, FiExternalLink, FiGlobe, FiCheckCircle } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { authenticator } from 'otplib';
import { QRCodeSVG } from 'qrcode.react';

export default function Tools() {
  // State cho password generator
  const [passwordLength, setPasswordLength] = useState(16); // State cho độ dài mật khẩu
  const [generatedPassword, setGeneratedPassword] = useState(''); // State cho mật khẩu đã tạo
  const [passwordCopied, setPasswordCopied] = useState(false); // State cho copy password
  const [useUppercase, setUseUppercase] = useState(true); // State cho chữ hoa
  const [useLowercase, setUseLowercase] = useState(true); // State cho chữ thường
  const [useNumbers, setUseNumbers] = useState(true); // State cho số
  const [useSpecial, setUseSpecial] = useState(false); // State cho ký tự đặc biệt

  // State cho 2FA
  const [secretKey, setSecretKey] = useState(''); // State cho secret key
  const [totpCode, setTotpCode] = useState(''); // State cho mã 2FA
  const [totpCopied, setTotpCopied] = useState(false); // State cho copy 2FA code
  const [timeRemaining, setTimeRemaining] = useState(0); // State cho thời gian còn lại (giây)

  // State cho QR code
  const [qrText, setQrText] = useState(''); // State cho text/URL để tạo QR code
  const [showQRCode, setShowQRCode] = useState(false); // State để hiển thị QR code

  // Hàm tạo mật khẩu ngẫu nhiên
  const generatePassword = () => {
    let charset = ''; // Khởi tạo bộ ký tự rỗng
    
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Thêm chữ hoa nếu được chọn
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'; // Thêm chữ thường nếu được chọn
    if (useNumbers) charset += '0123456789'; // Thêm số nếu được chọn
    if (useSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'; // Thêm ký tự đặc biệt nếu được chọn
    
    if (charset === '') { // Kiểm tra nếu không có ký tự nào được chọn
      alert('Vui lòng chọn ít nhất một loại ký tự'); // Hiển thị thông báo
      return; // Dừng hàm
    }
    
    let password = ''; // Khởi tạo mật khẩu rỗng
    for (let i = 0; i < passwordLength; i++) { // Lặp theo độ dài mật khẩu
      password += charset.charAt(Math.floor(Math.random() * charset.length)); // Thêm ký tự ngẫu nhiên
    }
    setGeneratedPassword(password); // Cập nhật state mật khẩu
    setPasswordCopied(false); // Reset trạng thái copy
  };
  
  // Hàm tăng độ dài mật khẩu
  const increaseLength = () => {
    if (passwordLength < 32) setPasswordLength(passwordLength + 1);
  };
  
  // Hàm giảm độ dài mật khẩu
  const decreaseLength = () => {
    if (passwordLength > 8) setPasswordLength(passwordLength - 1);
  };

  // Hàm copy mật khẩu
  const handleCopyPassword = () => {
    if (generatedPassword) { // Kiểm tra có mật khẩu không
      navigator.clipboard.writeText(generatedPassword); // Copy vào clipboard
      setPasswordCopied(true); // Đánh dấu đã copy
      setTimeout(() => setPasswordCopied(false), 2000); // Reset sau 2 giây
    }
  };

  // Hàm tính thời gian còn lại của mã 2FA
  const calculateTimeRemaining = () => {
    const period = 30; // TOTP period là 30 giây
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
    const timeInPeriod = currentTime % period; // Thời gian trong chu kỳ hiện tại
    return period - timeInPeriod; // Thời gian còn lại
  };

  // Hàm tạo mã 2FA từ secret key
  const generate2FA = () => {
    if (!secretKey.trim()) { // Kiểm tra secret key có rỗng không
      alert('Vui lòng nhập secret key'); // Hiển thị thông báo
      return; // Dừng hàm
    }
    try {
      // Tạo mã TOTP từ secret key
      const token = authenticator.generate(secretKey.trim()); // Tạo mã 6 chữ số
      setTotpCode(token); // Cập nhật mã 2FA
      setTotpCopied(false); // Reset trạng thái copy
      setTimeRemaining(calculateTimeRemaining()); // Cập nhật thời gian còn lại
    } catch (error) {
      alert('Secret key không hợp lệ. Vui lòng kiểm tra lại.'); // Hiển thị lỗi
      setTotpCode(''); // Xóa mã nếu lỗi
      setTimeRemaining(0); // Reset thời gian
    }
  };

  // Hàm copy mã 2FA
  const handleCopy2FA = () => {
    if (totpCode) { // Kiểm tra có mã 2FA không
      navigator.clipboard.writeText(totpCode); // Copy vào clipboard
      setTotpCopied(true); // Đánh dấu đã copy
      setTimeout(() => setTotpCopied(false), 2000); // Reset sau 2 giây
    }
  };

  // Hàm tạo QR code
  const generateQRCode = () => {
    if (!qrText.trim()) { // Kiểm tra text có rỗng không
      alert('Vui lòng nhập text hoặc URL'); // Hiển thị thông báo
      return; // Dừng hàm
    }
    setShowQRCode(true); // Hiển thị QR code
  };

  // Auto refresh mã 2FA và cập nhật countdown
  useEffect(() => {
    if (secretKey && totpCode) { // Kiểm tra có secret key và mã 2FA không
      // Cập nhật thời gian còn lại mỗi giây
      let lastRemaining = calculateTimeRemaining();
      setTimeRemaining(lastRemaining);
      
      const countdownInterval = setInterval(() => {
        const remaining = calculateTimeRemaining();
        
        // Khi chuyển từ 1 sang 30 (hết thời gian), tạo mã mới
        if (lastRemaining === 1 && remaining === 30) {
          try {
            const token = authenticator.generate(secretKey.trim());
            setTotpCode(token);
            setTotpCopied(false);
          } catch (error) {
            // Bỏ qua lỗi
          }
        }
        
        setTimeRemaining(remaining);
        lastRemaining = remaining;
      }, 1000); // Mỗi 1 giây

      return () => clearInterval(countdownInterval); // Clear interval khi unmount
    } else {
      setTimeRemaining(0); // Reset thời gian nếu không có mã
    }
  }, [secretKey, totpCode]);

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
          <div className="card p-6 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FiShield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Lấy mã xác thực ChatGPT</h2>
                <p className="text-sm text-gray-500">Lấy mã xác thực 2 yếu tố</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Nhập secret key Shop đã cấp để lấy mã 2FA.
            </p>
            <div className="flex-grow flex flex-col">
              <div className="space-y-3 mb-auto">
                <input
                  type="text"
                  placeholder="Nhập secret key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="input"
                />
              </div>
              <button 
                onClick={generate2FA}
                className="w-full btn btn-primary mt-3"
              >
                Lấy mã 2FA
              </button>
              {totpCode && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Mã 2FA:</p>
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-lg font-mono font-bold text-primary-600">{totpCode}</code>
                    <button
                      onClick={handleCopy2FA}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {totpCopied ? (
                        <FiCheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <FiCopy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {timeRemaining > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span>Mã hết hạn sau:</span>
                      <span className="font-medium text-primary-600">{timeRemaining}s</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tool 2: Tiện ích Netflix */}
          <div className="card p-6 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiGlobe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tiện ích Netflix</h2>
                <p className="text-sm text-gray-500">Truy cập VIVA để quản lý tài khoản</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Truy cập VIVA để quản lý và sử dụng tài khoản Netflix của bạn một cách dễ dàng.
            </p>
            <div className="flex-grow flex flex-col">
              <div className="h-10 mb-auto"></div>
              <a
                href="https://vivarocky.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn btn-primary flex items-center justify-center space-x-2 mt-3"
              >
                <FiExternalLink className="w-5 h-5" />
                <span>Truy cập VIVA</span>
              </a>
            </div>
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Độ dài mật khẩu: {passwordLength}</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={decreaseLength}
                    disabled={passwordLength <= 8}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-lg font-bold">-</span>
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((passwordLength - 8) / (32 - 8)) * 100}%, #e5e7eb ${((passwordLength - 8) / (32 - 8)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={increaseLength}
                    disabled={passwordLength >= 32}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-lg font-bold">+</span>
                  </button>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>8</span>
                  <span className="font-medium">{passwordLength}</span>
                  <span>32</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Ký tự được sử dụng:</label>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useUppercase}
                      onChange={(e) => setUseUppercase(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">ABC</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLowercase}
                      onChange={(e) => setUseLowercase(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">abc</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useNumbers}
                      onChange={(e) => setUseNumbers(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">123</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useSpecial}
                      onChange={(e) => setUseSpecial(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">#$&</span>
                  </label>
                </div>
              </div>
              
              <button 
                onClick={generatePassword}
                className="w-full btn btn-primary border-2 border-primary-600"
              >
                Tạo mật khẩu
              </button>
            </div>
            {generatedPassword && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Mật khẩu:</p>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-primary-600 break-all pr-2">{generatedPassword}</code>
                  <button 
                    onClick={handleCopyPassword}
                    className="text-primary-600 hover:text-primary-700 flex-shrink-0"
                  >
                    {passwordCopied ? (
                      <FiCheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <FiCopy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tool 4: QR Code Generator */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaQrcode className="w-6 h-6 text-blue-600" />
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
                value={qrText}
                onChange={(e) => {
                  setQrText(e.target.value);
                  setShowQRCode(false);
                }}
                className="input"
              />
              <button 
                onClick={generateQRCode}
                className="w-full btn btn-outline"
              >
                Tạo QR Code
              </button>
            </div>
            {showQRCode && qrText && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                <div className="w-32 h-32 bg-white mx-auto rounded border-2 border-gray-300 flex items-center justify-center p-2">
                  <QRCodeSVG value={qrText} size={120} />
                </div>
              </div>
            )}
            {!showQRCode && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                <div className="w-32 h-32 bg-white mx-auto rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">QR Code</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

