// Trang redirect từ shopping-guide sang guide
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ShoppingGuideRedirect() {
  const router = useRouter();

  // Redirect ngay khi component mount
  useEffect(() => {
    router.replace('/guide');
  }, [router]);

  // Hiển thị loading trong khi redirect
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}

