// API route: GET /api/accounts - Lấy danh sách tài khoản
// API route: POST /api/accounts - Tạo tài khoản mới
import type { NextApiRequest, NextApiResponse } from 'next';
import { GameAccount } from '@/types';

// Handler cho GET và POST requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

      // TODO: Kết nối với backend API để lấy dữ liệu thực
      // Hiện tại trả về empty array vì đã xóa mock data
      let filteredAccounts: GameAccount[] = [];

      // Filter theo game type
      if (gameType && gameType !== 'all') {
        filteredAccounts = filteredAccounts.filter(acc => acc.gameType === gameType);
      }
      
      // Filter theo status
      if (status && status !== 'all') {
        filteredAccounts = filteredAccounts.filter(acc => acc.status === status);
      } else {
        // Mặc định chỉ hiển thị available
        filteredAccounts = filteredAccounts.filter(acc => acc.status === 'available');
      }
      
      // Filter theo giá
      if (minPrice) {
        filteredAccounts = filteredAccounts.filter(acc => acc.price >= Number(minPrice));
      }
      if (maxPrice) {
        filteredAccounts = filteredAccounts.filter(acc => acc.price <= Number(maxPrice));
      }
      
      // Search theo tên game hoặc title
      if (search) {
        const searchLower = (search as string).toLowerCase();
        filteredAccounts = filteredAccounts.filter(acc => 
          acc.gameName.toLowerCase().includes(searchLower) ||
          acc.title.toLowerCase().includes(searchLower)
        );
      }

      // Tính toán pagination
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;
      const total = filteredAccounts.length;

      // Pagination
      const accounts = filteredAccounts.slice(skip, skip + limitNum);

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
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách tài khoản',
        error: error.message
      });
    }
  }

  // POST: Tạo tài khoản mới
  if (req.method === 'POST') {
    // TODO: Kết nối với backend API để tạo tài khoản
    return res.status(501).json({
      success: false,
      message: 'Chức năng này cần kết nối với backend API'
    });
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
