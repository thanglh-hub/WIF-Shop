// API route: GET /api/orders/track - Tra cứu đơn hàng
import type { NextApiRequest, NextApiResponse } from 'next';

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

    // TODO: Kết nối với backend API để tìm đơn hàng
    // const order = await findOrderFromBackend(orderId, email);
    
    // Tạm thời trả về 404 vì chưa có backend
    return res.status(404).json({
      success: false,
      message: 'Chức năng này cần kết nối với backend API'
    });

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
