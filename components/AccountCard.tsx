// Component AccountCard - Card hiển thị tài khoản game
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GameAccount } from '@/types';
import { FiStar, FiTag } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface AccountCardProps {
  account: GameAccount; // Tài khoản cần hiển thị
}

export default function AccountCard({ account }: AccountCardProps) {
  const router = useRouter();

  // Xử lý mua ngay
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Chuyển đến trang checkout với account ID
    router.push(`/checkout?accountId=${account._id}&quantity=1`);
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Link href={`/products/${account._id}`}>
      <div className="card card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {account.images && account.images.length > 0 ? (
            <Image
              src={account.images[0]}
              alt={account.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
              <FiTag className="w-16 h-16 text-primary-400" />
            </div>
          )}
          
          {/* Badge - Giảm giá */}
          {account.originalPrice && account.originalPrice > account.price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{Math.round((1 - account.price / account.originalPrice) * 100)}%
            </div>
          )}
          
          {/* Badge - Trạng thái */}
          {account.status === 'available' && account.stock > 0 ? (
            <div className="absolute top-2 left-2 badge badge-success">
              Còn hàng
            </div>
          ) : (
            <div className="absolute top-2 left-2 badge badge-danger">
              Hết hàng
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Game Name */}
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase">{account.gameName}</span>
            <span className="text-xs text-gray-400 ml-2">• {account.gameType}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {account.title}
          </h3>

          {/* Features */}
          {account.features && account.features.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {account.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="mb-3 space-y-1 text-sm text-gray-600">
            {account.level && (
              <div className="flex items-center space-x-1">
                <FiStar className="w-4 h-4" />
                <span>Level: {account.level}</span>
              </div>
            )}
            {account.rank && (
              <div>
                <span>Rank: {account.rank}</span>
              </div>
            )}
            {account.server && (
              <div>
                <span>Server: {account.server}</span>
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="mt-auto pt-3 border-t">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xl font-bold text-primary-600">
                  {formatPrice(account.price)}
                </div>
                {account.originalPrice && account.originalPrice > account.price && (
                  <div className="text-sm text-gray-400 line-through">
                    {formatPrice(account.originalPrice)}
                  </div>
                )}
              </div>
              {account.stock > 0 && (
                <div className="text-xs text-gray-500">
                  Còn {account.stock} tài khoản
                </div>
              )}
            </div>
            
            <button
              onClick={handleBuyNow}
              disabled={account.status !== 'available' || account.stock === 0}
              className="w-full btn btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

