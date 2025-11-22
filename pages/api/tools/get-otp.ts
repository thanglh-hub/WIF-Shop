// API route: POST /api/tools/get-otp - Lấy mã OTP từ email
import type { NextApiRequest, NextApiResponse } from 'next';

// Handler cho POST request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chỉ cho phép POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Lấy email từ request body
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email không hợp lệ'
      });
    }

    // TODO: Tích hợp với email service để lấy OTP thực tế
    // Hiện tại trả về mock data
    // Trong thực tế, bạn cần:
    // 1. Kết nối với email service (Gmail API, IMAP, etc.)
    // 2. Tìm email OTP mới nhất
    // 3. Extract OTP code từ email
    // 4. Trả về OTP code

    // Mock response - Tạo OTP ngẫu nhiên 6 số
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      message: 'Đã lấy mã OTP thành công',
      data: {
        code: mockOtp,
        email: email,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    // Xử lý lỗi
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy mã OTP',
      error: error.message
    });
  }
}

