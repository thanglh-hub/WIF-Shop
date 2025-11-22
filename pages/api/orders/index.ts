// API route: GET /api/orders - Lấy danh sách đơn hàng
// API route: POST /api/orders - Tạo đơn hàng mới
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { Order, GameAccount } from '@/types';
import { ObjectId } from 'mongodb';

// Handler cho GET và POST requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Kết nối database
  const { db } = await connectToDatabase();

  // GET: Lấy danh sách đơn hàng
  if (req.method === 'GET') {
    try {
      // Kiểm tra authentication
      const user = getUserFromRequest(req);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Chưa đăng nhập'
        });
      }

      // Xây dựng filter query
      const filter: any = {};
      
      // User thường chỉ xem được đơn hàng của mình
      // Admin xem được tất cả
      if (user.role !== 'admin') {
        filter.userId = user.userId;
      }

      // Filter theo status nếu có
      const { status } = req.query;
      if (status && status !== 'all') {
        filter.status = status;
      }

      // Lấy danh sách đơn hàng
      const orders = await db
        .collection<Order>('orders')
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách đơn hàng',
        error: error.message
      });
    }
  }

  // POST: Tạo đơn hàng mới
  if (req.method === 'POST') {
    try {
      // Lấy dữ liệu từ request body
      const { items, paymentMethod, shippingInfo, notes } = req.body;
      
      // Lấy user từ request (nếu có đăng nhập) - không bắt buộc cho hệ thống nội bộ
      const user = getUserFromRequest(req);
      const userId = user ? user.userId : null; // Cho phép đặt hàng không cần đăng nhập

      // Validate dữ liệu
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Giỏ hàng trống'
        });
      }

      if (!paymentMethod || !shippingInfo) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin thanh toán hoặc giao hàng'
        });
      }

      // Tính tổng tiền và validate tài khoản
      let totalAmount = 0;
      const validatedItems = [];

      for (const item of items) {
        // Tìm tài khoản trong database
        const account = await db
          .collection<GameAccount>('accounts')
          .findOne({ _id: new ObjectId(item.accountId) });

        // Kiểm tra nếu không tìm thấy
        if (!account) {
          return res.status(404).json({
            success: false,
            message: `Không tìm thấy tài khoản: ${item.title}`
          });
        }

        // Kiểm tra nếu không còn hàng
        if (account.status !== 'available' || account.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Tài khoản ${item.title} không còn hàng hoặc không khả dụng`
          });
        }

        // Tính tổng tiền
        totalAmount += account.price * item.quantity;

        // Thêm vào validated items
        validatedItems.push({
          accountId: account._id!.toString(),
          title: account.title,
          price: account.price,
          quantity: item.quantity
        });
      }

      // Tạo đơn hàng mới
      const newOrder: Order = {
        userId: userId || shippingInfo.email, // Sử dụng email làm userId nếu không đăng nhập
        items: validatedItems,
        totalAmount,
        paymentMethod,
        shippingInfo,
        notes: notes || '',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Insert vào database
      const result = await db.collection('orders').insertOne(newOrder);

      // Cập nhật stock và status của các tài khoản
      for (const item of validatedItems) {
        await db.collection('accounts').updateOne(
          { _id: new ObjectId(item.accountId) },
          {
            $inc: { stock: -item.quantity, soldCount: item.quantity },
            $set: { 
              status: 'sold',
              updatedAt: new Date()
            }
          }
        );
      }

      // Trả về kết quả
      return res.status(201).json({
        success: true,
        message: 'Tạo đơn hàng thành công',
        data: {
          ...newOrder,
          _id: result.insertedId
        }
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo đơn hàng',
        error: error.message
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}

