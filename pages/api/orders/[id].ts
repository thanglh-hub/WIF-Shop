// API route: GET /api/orders/[id] - Lấy chi tiết đơn hàng
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
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
    
    // Lấy ID từ query
    const { id } = req.query;

    // Validate ID
    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID không hợp lệ'
      });
    }

    // Kiểm tra authentication
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Chưa đăng nhập'
      });
    }

    // Tìm đơn hàng
    const order = await db
      .collection<Order>('orders')
      .findOne({ _id: new ObjectId(id) });

    // Kiểm tra nếu không tìm thấy
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    // Kiểm tra quyền truy cập (user chỉ xem được đơn hàng của mình, admin xem được tất cả)
    if (user.role !== 'admin' && order.userId !== user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập đơn hàng này'
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
      message: 'Lỗi khi lấy chi tiết đơn hàng',
      error: error.message
    });
  }
}

