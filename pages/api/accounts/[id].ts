// API route: GET /api/accounts/[id] - Lấy chi tiết tài khoản
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Validate ID
  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'ID không hợp lệ'
    });
  }

  // GET: Lấy chi tiết tài khoản
  if (req.method === 'GET') {
    try {
      // TODO: Kết nối với backend API để lấy dữ liệu thực
      // const account = await getAccountFromBackend(id);
      
      // Tạm thời trả về 404 vì chưa có backend
      return res.status(404).json({
        success: false,
        message: 'Chức năng này cần kết nối với backend API'
      });
      
      // Code mẫu khi có backend:
      // if (!account) {
      //   return res.status(404).json({
      //     success: false,
      //     message: 'Không tìm thấy tài khoản'
      //   });
      // }
      // 
      // // Chỉ hiển thị available cho user thường
      // if (account.status !== 'available') {
      //   return res.status(403).json({
      //     success: false,
      //     message: 'Tài khoản không khả dụng'
      //   });
      // }
      // 
      // return res.status(200).json({
      //   success: true,
      //   data: account
      // });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy chi tiết tài khoản',
        error: error.message
      });
    }
  }

  // PUT và DELETE: TODO - Kết nối với backend API
  if (req.method === 'PUT' || req.method === 'DELETE') {
    return res.status(501).json({
      success: false,
      message: 'Chức năng này cần kết nối với backend API'
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
