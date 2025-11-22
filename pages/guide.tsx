// Trang Hướng dẫn mua hàng
'use client';

import { FiShoppingCart, FiCreditCard, FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function Guide() {
  const steps = [
    {
      icon: FiShoppingCart,
      title: 'Chọn sản phẩm',
      description: 'Tìm kiếm và chọn sản phẩm tài khoản game mà bạn muốn mua. Xem chi tiết sản phẩm để đảm bảo phù hợp với nhu cầu của bạn.'
    },
    {
      icon: FiCreditCard,
      title: 'Thanh toán',
      description: 'Click "Mua ngay" và điền đầy đủ thông tin: họ tên, email nhận tài khoản, số điện thoại. Chọn phương thức thanh toán phù hợp và hoàn tất thanh toán.'
    },
    {
      icon: FiMail,
      title: 'Nhận tài khoản',
      description: 'Sau khi thanh toán thành công, chúng tôi sẽ gửi thông tin tài khoản đến email của bạn trong vòng 5-60 phút. Kiểm tra cả hộp thư spam nếu không thấy email.'
    },
    {
      icon: FiCheckCircle,
      title: 'Sử dụng tài khoản',
      description: 'Đăng nhập vào tài khoản và đổi mật khẩu ngay để bảo mật. Bạn có thể tra cứu đơn hàng bất cứ lúc nào để xem lại thông tin.'
    }
  ];

  const tips = [
    'Đảm bảo email bạn cung cấp là chính xác để nhận được thông tin tài khoản',
    'Kiểm tra cả hộp thư spam nếu không thấy email trong hộp thư đến',
    'Đổi mật khẩu ngay sau khi nhận tài khoản để tăng cường bảo mật',
    'Lưu lại mã đơn hàng để tra cứu sau này nếu cần',
    'Liên hệ hỗ trợ ngay nếu gặp bất kỳ vấn đề nào'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hướng dẫn mua hàng</h1>
          <p className="text-gray-600 text-lg">
            Hướng dẫn chi tiết từng bước để mua tài khoản game dễ dàng
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quy trình mua hàng</h2>
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 card p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Lưu ý quan trọng</h2>
          <div className="card p-6">
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <h3 className="font-bold mb-2">Chuyển khoản</h3>
              <p className="text-sm text-gray-600">Ngân hàng, Internet Banking</p>
            </div>
            <div className="card p-4 text-center">
              <h3 className="font-bold mb-2">Ví điện tử</h3>
              <p className="text-sm text-gray-600">MoMo, ZaloPay, VNPay</p>
            </div>
            <div className="card p-4 text-center">
              <h3 className="font-bold mb-2">An toàn</h3>
              <p className="text-sm text-gray-600">Bảo mật, mã hóa SSL</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Sẵn sàng mua hàng?</h2>
          <p className="mb-6 text-primary-100">
            Xem ngay các sản phẩm tài khoản game đang có sẵn
          </p>
          <Link href="/products" className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center space-x-2">
            <span>Xem sản phẩm</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

