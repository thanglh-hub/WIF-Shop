// API route: GET /api/orders/track - Tra cứu đơn hàng
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/types';
import { ObjectId } from 'mongodb';

// Handler cho GET request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chỉ cho phép GET method
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Kết nối database
    const { db } = await connectToDatabase();

    // Lấy query parameters
    const { orderId, email } = req.query;

    // Validate dữ liệu
    if (!orderId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập mã đơn hàng và email'
      });
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(orderId as string)) {
      return res.status(400).json({
        success: false,
        message: 'Mã đơn hàng không hợp lệ'
      });
    }

    // Tìm đơn hàng
    const order = await db
      .collection<Order>('orders')
      .findOne({
        _id: new ObjectId(orderId as string),
        'shippingInfo.email': email
      });

    // Kiểm tra nếu không tìm thấy
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng và email.'
      });
    }

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    // Xử lý lỗi
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tra cứu đơn hàng',
      error: error.message
    });
  }
}

