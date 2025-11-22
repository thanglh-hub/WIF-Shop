// API route: GET /api/blogs - Lấy danh sách blog (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';

const mockBlogs = [
  {
    slug: 'huong-dan-mua-tai-khoan',
    title: 'Hướng dẫn mua tài khoản game',
    excerpt: 'Hướng dẫn chi tiết cách mua tài khoản game an toàn và uy tín',
    content: 'Nội dung blog...',
    author: 'Admin',
    publishedAt: new Date('2024-01-01'),
    image: '/images/blog-1.jpg'
  }
];

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
    return res.status(200).json({
      success: true,
      data: mockBlogs
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách blog',
      error: error.message
    });
  }
}
