// Trang admin để seed mockup data
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';

export default function SeedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State cho loading
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null); // State cho kết quả

  // Hàm seed data
  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        // Chuyển về trang chủ sau 2 giây
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: 'Lỗi khi seed data: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Tạo Mockup Data
          </h1>
          
          <p className="text-gray-600 mb-8 text-center">
            Click vào nút bên dưới để thêm 3 sản phẩm mẫu vào database:
            <br />
            • Netflix Premium
            <br />
            • Spotify Premium
            <br />
            • Gaming Accounts
          </p>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleSeed}
              disabled={loading}
              className="btn btn-primary text-lg px-8 py-4 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiRefreshCw className="w-5 h-5 animate-spin" />
                  <span>Đang tạo data...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Tạo Mockup Data</span>
                </>
              )}
            </button>
          </div>

          {result && (
            <div
              className={`p-4 rounded-lg ${
                result.success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <FiCheckCircle className="w-5 h-5" />
                ) : (
                  <FiXCircle className="w-5 h-5" />
                )}
                <div>
                  <p className="font-medium">{result.message}</p>
                  {result.data && result.data.accounts && (
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {result.data.accounts.map((acc: any, index: number) => (
                        <li key={index}>
                          {acc.title} - {acc.price.toLocaleString('vi-VN')} VNĐ
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="btn btn-outline"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

