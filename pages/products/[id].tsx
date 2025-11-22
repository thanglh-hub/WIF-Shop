// Product Detail page - Trang chi tiết sản phẩm
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GameAccount } from '@/types';
import { FiShield, FiClock, FiStar, FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [account, setAccount] = useState<GameAccount | null>(null); // State cho tài khoản
  const [loading, setLoading] = useState(true); // State cho loading
  const [selectedImage, setSelectedImage] = useState(0); // State cho hình ảnh được chọn
  const [quantity, setQuantity] = useState(1); // State cho số lượng

  // Fetch account detail khi id thay đổi
  useEffect(() => {
    if (id) {
      fetchAccountDetail();
    }
  }, [id]);

  // Hàm fetch account detail
  const fetchAccountDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/accounts/${id}`);
      const data = await response.json();
      if (data.success) {
        setAccount(data.data);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching account:', error);
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    if (!account) return;
    
    // Chuyển đến trang checkout
    router.push(`/checkout?accountId=${account._id}&quantity=${quantity}`);
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-lg mb-4">Không tìm thấy sản phẩm</p>
        <Link href="/products" className="btn btn-primary">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Quay lại danh sách</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
            {account.images && account.images.length > 0 ? (
              <Image
                src={account.images[selectedImage]}
                alt={account.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <span className="text-4xl font-bold text-primary-400">
                  {account.gameName.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Badge - Giảm giá */}
            {account.originalPrice && account.originalPrice > account.price && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                -{Math.round((1 - account.price / account.originalPrice) * 100)}%
              </div>
            )}
            
            {/* Badge - Trạng thái */}
            {account.status === 'available' && account.stock > 0 ? (
              <div className="absolute top-4 left-4 badge badge-success">
                Còn hàng
              </div>
            ) : (
              <div className="absolute top-4 left-4 badge badge-danger">
                Hết hàng
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {account.images && account.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {account.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${account.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Game Name & Type */}
          <div className="mb-2">
            <span className="text-sm text-gray-500 uppercase">{account.gameName}</span>
            <span className="text-sm text-gray-400 ml-2">• {account.gameType}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{account.title}</h1>

          {/* Rating & Sold Count */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
            <div className="text-gray-500">
              Đã bán: <span className="font-medium">{account.soldCount}</span>
            </div>
            {account.stock > 0 && (
              <div className="text-gray-500">
                Còn lại: <span className="font-medium text-green-600">{account.stock}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Giá bán</div>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(account.price)}
              </span>
              {account.originalPrice && account.originalPrice > account.price && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(account.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Features */}
          {account.features && account.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Tính năng</h3>
              <ul className="space-y-2">
                {account.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FiShield className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Bảo hành</span>
              </div>
              <p className="text-sm text-gray-600">30 ngày</p>
            </div>
            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FiClock className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Giao hàng</span>
              </div>
              <p className="text-sm text-gray-600">Tức thì</p>
            </div>
          </div>

          {/* Additional Info */}
          {(account.level || account.rank || account.server) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Thông tin chi tiết</h3>
              <div className="space-y-2 text-sm">
                {account.level && (
                  <div>
                    <span className="font-medium">Level:</span> {account.level}
                  </div>
                )}
                {account.rank && (
                  <div>
                    <span className="font-medium">Rank:</span> {account.rank}
                  </div>
                )}
                {account.server && (
                  <div>
                    <span className="font-medium">Server:</span> {account.server}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          {account.status === 'available' && account.stock > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Số lượng</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(account.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">
                    (Tối đa: {account.stock})
                  </span>
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 text-lg py-4"
              >
                <span>Mua ngay</span>
              </button>
            </div>
          ) : (
            <button
              disabled
              className="w-full btn bg-gray-300 text-gray-500 cursor-not-allowed py-4"
            >
              Hết hàng
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <div className="card p-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {account.description}
          </p>
        </div>
      </div>
    </div>
  );
}

