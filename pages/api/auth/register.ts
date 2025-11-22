// API route: POST /api/auth/register - Đăng ký (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { email, password, fullName, phone } = req.body;

    // Validate
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
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

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
      });
    }

    // Mock: Generate user ID
    const userId = `user_${Date.now()}`;

    // Generate token
    const token = generateToken({
      userId,
      email,
      role: 'user'
    });

    // Mock user data
    const newUser = {
      _id: userId,
      email,
      fullName,
      phone: phone || '',
      role: 'user' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        token,
        user: newUser
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng ký',
      error: error.message
    });
  }
}
