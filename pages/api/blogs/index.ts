// API route: GET /api/blogs - Lấy danh sách blog posts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: Date;
  views: number;
}

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
    const { category, page = '1', limit = '12' } = req.query;

    // Xây dựng filter query
    const filter: any = {};
    
    // Filter theo category
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Tính toán pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Lấy tổng số documents
    const total = await db.collection('blogs').countDocuments(filter);

    // Lấy danh sách blog posts với pagination
    const posts = await db
      .collection<BlogPost>('blogs')
      .find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      data: posts,
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
      message: 'Lỗi khi lấy danh sách blog',
      error: error.message
    });
  }
}

