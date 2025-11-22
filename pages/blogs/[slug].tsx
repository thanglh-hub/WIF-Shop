// Trang chi tiết blog post
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiUser, FiArrowLeft, FiTag, FiEye } from 'react-icons/fi';

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

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null); // State cho bài đăng
  const [loading, setLoading] = useState(true); // State cho loading

  // Fetch post khi slug thay đổi
  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Hàm fetch post
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      } else {
        router.push('/blogs');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/blogs');
    } finally {
      setLoading(false);
    }
  };

  // Format ngày tháng
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Không tìm thấy bài đăng</p>
        <Link href="/blogs" className="btn btn-primary">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Quay lại danh sách</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="badge badge-primary">{post.category}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <FiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiEye className="w-4 h-4" />
              <span>{post.views} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t pt-6 mb-8">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <FiTag className="w-5 h-5 text-gray-500" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

