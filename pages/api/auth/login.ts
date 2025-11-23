// API route: POST /api/auth/login - Đăng nhập
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
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // TODO: Kết nối với backend API để xác thực user
    // const user = await authenticateUserFromBackend(email, password);
    
    // Tạm thời trả về lỗi vì chưa có backend
    return res.status(501).json({
      success: false,
      message: 'Chức năng này cần kết nối với backend API'
    });

    // Code mẫu khi có backend:
    // if (!user) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Email hoặc mật khẩu không đúng'
    //   });
    // }
    // 
    // const token = generateToken({
    //   userId: user._id!,
    //   email: user.email,
    //   role: user.role
    // });
    // 
    // const { password: _, ...userWithoutPassword } = user;

    // return res.status(200).json({
    //   success: true,
    //   message: 'Đăng nhập thành công',
    //   data: {
    //     token,
    //     user: userWithoutPassword
    //   }
    // });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng nhập',
      error: error.message
    });
  }
}
