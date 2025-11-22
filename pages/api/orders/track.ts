// API route: GET /api/orders/track - Tra cứu đơn hàng (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockOrders } from '@/lib/mockData';

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
    const { orderId, email } = req.query;

    if (!orderId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập mã đơn hàng và email'
      });
    }

    // Mock: Find order
    const order = mockOrders.find(
      o => o._id === orderId && o.shippingInfo.email === email
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng và email.'
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tra cứu đơn hàng',
      error: error.message
    });
  }
}
