// API route: GET /api/accounts/[id] - Lấy chi tiết tài khoản
// API route: PUT /api/accounts/[id] - Cập nhật tài khoản (admin only)
// API route: DELETE /api/accounts/[id] - Xóa tài khoản (admin only)
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { GameAccount } from '@/types';

// Handler cho GET, PUT, DELETE requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Kết nối database
  const { db } = await connectToDatabase();
  
  // Lấy ID từ query
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
      // Tìm tài khoản theo ID
      const account = await db
        .collection<GameAccount>('accounts')
        .findOne({ _id: new ObjectId(id) });

      // Kiểm tra nếu không tìm thấy
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản'
        });
      }

      // Kiểm tra quyền truy cập (user thường chỉ xem được available)
      const user = getUserFromRequest(req);
      if (user?.role !== 'admin' && account.status !== 'available') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản không khả dụng'
        });
      }

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        data: account
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy chi tiết tài khoản',
        error: error.message
      });
    }
  }

  // PUT: Cập nhật tài khoản (chỉ admin)
  if (req.method === 'PUT') {
    try {
      // Kiểm tra authentication
      const user = getUserFromRequest(req);
      if (!user || user.role !== 'admin') {
        return res.status(401).json({
          success: false,
          message: 'Không có quyền truy cập'
        });
      }

      // Lấy dữ liệu cập nhật từ request body
      const updateData = req.body;

      // Cập nhật updatedAt
      updateData.updatedAt = new Date();

      // Update trong database
      const result = await db
        .collection('accounts')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

      // Kiểm tra nếu không tìm thấy
      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản'
        });
      }

      // Lấy tài khoản đã cập nhật
      const updatedAccount = await db
        .collection<GameAccount>('accounts')
        .findOne({ _id: new ObjectId(id) });

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        data: updatedAccount,
        message: 'Cập nhật tài khoản thành công'
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật tài khoản',
        error: error.message
      });
    }
  }

  // DELETE: Xóa tài khoản (chỉ admin)
  if (req.method === 'DELETE') {
    try {
      // Kiểm tra authentication
      const user = getUserFromRequest(req);
      if (!user || user.role !== 'admin') {
        return res.status(401).json({
          success: false,
          message: 'Không có quyền truy cập'
        });
      }

      // Xóa trong database
      const result = await db
        .collection('accounts')
        .deleteOne({ _id: new ObjectId(id) });

      // Kiểm tra nếu không tìm thấy
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản'
        });
      }

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        message: 'Xóa tài khoản thành công'
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa tài khoản',
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

