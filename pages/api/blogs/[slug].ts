// API route: GET /api/blogs/[slug] - Lấy chi tiết blog post
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
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
    
    // Lấy slug từ query
    const { slug } = req.query;

    // Validate slug
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Slug không hợp lệ'
      });
    }

    // Tìm blog post theo slug
    const post = await db
      .collection<BlogPost>('blogs')
      .findOne({ slug });

    // Kiểm tra nếu không tìm thấy
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài đăng'
      });
    }

    // Tăng số lượt xem
    await db.collection('blogs').updateOne(
      { slug },
      { $inc: { views: 1 } }
    );

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      data: {
        ...post,
        views: post.views + 1
      }
    });
  } catch (error: any) {
    // Xử lý lỗi
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết blog',
      error: error.message
    });
  }
}

