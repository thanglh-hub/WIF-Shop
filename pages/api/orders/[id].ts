// API route: GET /api/orders/[id] - Lấy chi tiết đơn hàng
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'ID không hợp lệ'
      });
    }

    // TODO: Kết nối với backend API để lấy đơn hàng
    // const order = await getOrderFromBackend(id);
    
    // Check permissions
    const user = getUserFromRequest(req);
    
    // Tạm thời trả về 404 vì chưa có backend
    return res.status(404).json({
      success: false,
      message: 'Chức năng này cần kết nối với backend API'
    });
    
    // Code mẫu khi có backend:
    // if (!order) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Không tìm thấy đơn hàng'
    //   });
    // }
    // 
    // if (user && user.role !== 'admin' && order.userId !== user.userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Không có quyền truy cập đơn hàng này'
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết đơn hàng',
      error: error.message
    });
  }
}
