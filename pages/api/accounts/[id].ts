// API route: GET /api/accounts/[id] - Lấy chi tiết tài khoản (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockAccounts } from '@/lib/mockData';

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
      const account = mockAccounts.find(acc => acc._id === id);

      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản'
        });
      }

      // Chỉ hiển thị available cho user thường
      if (account.status !== 'available') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản không khả dụng'
        });
      }

      return res.status(200).json({
        success: true,
        data: account
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy chi tiết tài khoản',
        error: error.message
      });
    }
  }

  // PUT và DELETE: Disabled in mock mode
  if (req.method === 'PUT' || req.method === 'DELETE') {
    return res.status(501).json({
      success: false,
      message: 'Chức năng này tạm thời không khả dụng (Mock mode)'
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
