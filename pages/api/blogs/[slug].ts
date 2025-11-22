// API route: GET /api/blogs/[slug] - Lấy chi tiết blog (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';

const mockBlogs: Record<string, any> = {
  'huong-dan-mua-tai-khoan': {
    slug: 'huong-dan-mua-tai-khoan',
    title: 'Hướng dẫn mua tài khoản game',
    content: 'Nội dung chi tiết của blog...',
    author: 'Admin',
    publishedAt: new Date('2024-01-01'),
    image: '/images/blog-1.jpg'
  }
};

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
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Slug không hợp lệ'
      });
    }

    const blog = mockBlogs[slug];

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy blog'
      });
    }

    return res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết blog',
      error: error.message
    });
  }
}
