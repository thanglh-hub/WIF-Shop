// Component Footer - Footer cho website
'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">WIF Shop</h3>
            <p className="text-sm mb-4">
              Chuyên cung cấp tài khoản game uy tín, chất lượng với giá cả hợp lý.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary-400 transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-400 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-primary-400 transition-colors">
                  Chính sách hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-primary-400 transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>wifshop@gmail.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm mb-2">Thời gian làm việc:</p>
              <p className="text-xs">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} WIF Shop. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}

