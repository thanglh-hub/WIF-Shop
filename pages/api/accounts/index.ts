// API route: GET /api/accounts - Lấy danh sách tài khoản
// API route: POST /api/accounts - Tạo tài khoản mới (admin only)
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { GameAccount } from '@/types';

// Handler cho GET và POST requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Kết nối database
  const { db } = await connectToDatabase();

  // GET: Lấy danh sách tài khoản
  if (req.method === 'GET') {
    try {
      // Lấy query parameters
      const { 
        gameType, 
        status, 
        minPrice, 
        maxPrice, 
        search,
        page = '1',
        limit = '12'
      } = req.query;

      // Xây dựng filter query
      const filter: any = {};
      
      // Filter theo game type
      if (gameType && gameType !== 'all') {
        filter.gameType = gameType;
      }
      
      // Filter theo status (chỉ hiển thị available cho user thường)
      const user = getUserFromRequest(req);
      if (user?.role !== 'admin') {
        filter.status = 'available';
      } else if (status && status !== 'all') {
        filter.status = status;
      }
      
      // Filter theo giá
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      
      // Search theo tên game hoặc title
      if (search) {
        filter.$or = [
          { gameName: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } }
        ];
      }

      // Tính toán pagination
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;

      // Lấy tổng số documents
      const total = await db.collection('accounts').countDocuments(filter);

      // Lấy danh sách tài khoản với pagination
      const accounts = await db
        .collection<GameAccount>('accounts')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray();

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        data: accounts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách tài khoản',
        error: error.message
      });
    }
  }

  // POST: Tạo tài khoản mới (chỉ admin)
  if (req.method === 'POST') {
    try {
      // Kiểm tra authentication
      const user = getUserFromRequest(req);
      if (!user || user.role !== 'admin') {
        return res.status(401).json({
          success: false,
          message: 'Không có quyền truy cập'
        });
      }

      // Lấy dữ liệu từ request body
      const accountData: GameAccount = req.body;

      // Validate dữ liệu
      if (!accountData.title || !accountData.gameName || !accountData.price) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin bắt buộc'
        });
      }

      // Thêm metadata (loại bỏ _id để MongoDB tự tạo)
      const { _id, ...accountWithoutId } = accountData;
      const newAccount: Omit<GameAccount, '_id'> = {
        ...accountWithoutId,
        status: accountData.status || 'available',
        stock: accountData.stock || 1,
        soldCount: 0,
        images: accountData.images || [],
        features: accountData.features || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Insert vào database
      const result = await db.collection('accounts').insertOne(newAccount as any);

      // Trả về kết quả
      return res.status(201).json({
        success: true,
        data: { ...newAccount, _id: result.insertedId },
        message: 'Tạo tài khoản thành công'
      });
    } catch (error: any) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo tài khoản',
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

