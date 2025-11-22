// API route: POST /api/auth/login - Đăng nhập
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { comparePassword, generateToken } from '@/lib/auth';
import { User } from '@/types';

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
    // Kết nối database
    const { db } = await connectToDatabase();

    // Lấy dữ liệu từ request body
    const { email, password } = req.body;

    // Validate dữ liệu
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // Tìm user theo email
    const user = await db.collection<User>('users').findOne({ email });

    // Kiểm tra nếu không tìm thấy user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // So sánh password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT token
    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
      role: user.role
    });

    // Trả về kết quả (không trả về password)
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error: any) {
    // Xử lý lỗi
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng nhập',
      error: error.message
    });
  }
}

