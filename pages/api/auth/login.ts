// API route: POST /api/auth/login - Đăng nhập (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '@/lib/mockData';
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
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // Mock login - accept any password for demo
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Generate token
    const token = generateToken({
      userId: user._id!,
      email: user.email,
      role: user.role
    });

    // Trả về kết quả (không trả về password)
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        user: userWithoutPassword
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng nhập',
      error: error.message
    });
  }
}
