// API route để seed mockup data vào database
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { GameAccount } from '@/types';

// Mockup data cho các sản phẩm
const mockAccounts: Omit<GameAccount, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Netflix Premium',
    gameName: 'Netflix',
    gameType: 'Other',
    description: 'Tài khoản Netflix Premium 4K Ultra HD, 4 màn hình cùng lúc, xem mọi nội dung độc quyền. Tài khoản chính chủ, bảo hành 30 ngày.',
    price: 50000,
    originalPrice: 70000,
    images: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop'
    ],
    level: undefined,
    rank: 'Premium',
    server: 'Global',
    features: [
      '4K Ultra HD',
      '4 màn hình cùng lúc',
      'Không quảng cáo',
      'Tất cả nội dung độc quyền',
      'Bảo hành 30 ngày'
    ],
    status: 'available',
    stock: 50,
    soldCount: 447
  },
  {
    title: 'Spotify Premium',
    gameName: 'Spotify',
    gameType: 'Other',
    description: 'Nghe nhạc không giới hạn, không quảng cáo, chất lượng cao, tải về offline. Tài khoản Premium chính chủ, bảo hành 30 ngày.',
    price: 35000,
    originalPrice: 50000,
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop'
    ],
    level: undefined,
    rank: 'Premium',
    server: 'Global',
    features: [
      'Không quảng cáo',
      'Chất lượng cao',
      'Tải về offline',
      'Nghe không giới hạn',
      'Bảo hành 30 ngày'
    ],
    status: 'available',
    stock: 100,
    soldCount: 1288
  },
  {
    title: 'Gaming Accounts',
    gameName: 'Steam & Epic Games',
    gameType: 'MMORPG',
    description: 'Tài khoản game Steam, Epic Games với nhiều game hot, giá trị hàng triệu. Bao gồm các tựa game AAA mới nhất, bảo hành 15 ngày.',
    price: 150000,
    originalPrice: 200000,
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop'
    ],
    level: undefined,
    rank: 'Premium Collection',
    server: 'Global',
    features: [
      'Nhiều game AAA',
      'Giá trị hàng triệu',
      'Tài khoản chính chủ',
      'Hỗ trợ đổi mật khẩu',
      'Bảo hành 15 ngày'
    ],
    status: 'available',
    stock: 30,
    soldCount: 189
  }
];

// Handler cho POST request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chỉ cho phép POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Kết nối database
    const { db } = await connectToDatabase();

    // Xóa dữ liệu cũ (optional - có thể comment nếu muốn giữ lại)
    await db.collection('accounts').deleteMany({});

    // Thêm mockup data
    const now = new Date();
    const accountsToInsert = mockAccounts.map(account => ({
      ...account,
      createdAt: now,
      updatedAt: now
    }));

    const result = await db.collection('accounts').insertMany(accountsToInsert);

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      message: `Đã thêm ${result.insertedCount} tài khoản vào database!`,
      data: {
        insertedCount: result.insertedCount,
        accounts: mockAccounts.map((acc, index) => ({
          index: index + 1,
          title: acc.title,
          price: acc.price
        }))
      }
    });
  } catch (error: any) {
    // Xử lý lỗi
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi seed data',
      error: error.message
    });
  }
}

