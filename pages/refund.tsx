// Trang Chính sách hoàn tiền
'use client';

import { FiRefreshCw, FiClock, FiXCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function Refund() {
  const conditions = [
    {
      icon: FiCheckCircle,
      title: 'Được hoàn tiền',
      items: [
        'Tài khoản không đúng như mô tả sản phẩm',
        'Tài khoản bị khóa trong vòng 30 ngày kể từ ngày mua',
        'Không nhận được thông tin tài khoản sau 2 giờ kể từ khi thanh toán',
        'Tài khoản đã được người khác sử dụng trước đó',
        'Lỗi kỹ thuật từ phía chúng tôi'
      ]
    },
    {
      icon: FiXCircle,
      title: 'Không được hoàn tiền',
      items: [
        'Đã sử dụng tài khoản quá 7 ngày',
        'Vi phạm điều khoản sử dụng của nhà phát hành game',
        'Yêu cầu hoàn tiền không có lý do chính đáng',
        'Đã đổi mật khẩu và sử dụng tài khoản bình thường',
        'Tài khoản bị khóa do hành vi vi phạm của người dùng'
      ]
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Liên hệ hỗ trợ',
      description: 'Gửi yêu cầu hoàn tiền qua email hoặc hotline kèm mã đơn hàng và lý do'
    },
    {
      step: 2,
      title: 'Xem xét yêu cầu',
      description: 'Chúng tôi sẽ xem xét yêu cầu trong vòng 24-48 giờ làm việc'
    },
    {
      step: 3,
      title: 'Xác nhận và xử lý',
      description: 'Nếu được chấp nhận, chúng tôi sẽ hoàn tiền trong vòng 3-5 ngày làm việc'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiRefreshCw className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Chính sách hoàn tiền</h1>
          <p className="text-gray-600 text-lg">
            Cam kết bảo vệ quyền lợi khách hàng với chính sách hoàn tiền minh bạch
          </p>
        </div>

        {/* Overview */}
        <div className="card p-6 bg-primary-50 border border-primary-200 mb-8">
          <div className="flex items-start space-x-3">
            <FiAlertCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Thời gian hoàn tiền</h2>
              <p className="text-gray-700">
                Bạn có thể yêu cầu hoàn tiền trong vòng <strong>7 ngày</strong> kể từ ngày mua hàng. 
                Sau khi yêu cầu được chấp nhận, tiền sẽ được hoàn về tài khoản của bạn trong vòng <strong>3-5 ngày làm việc</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Điều kiện hoàn tiền</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditions.map((condition, index) => {
              const Icon = condition.icon;
              return (
                <div key={index} className="card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className={`w-6 h-6 ${
                      index === 0 ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <h3 className="text-xl font-bold">{condition.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2 text-gray-700">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          index === 0 ? 'bg-green-600' : 'bg-red-600'
                        }`}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quy trình hoàn tiền</h2>
          <div className="space-y-6">
            {process.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 card p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Lưu ý quan trọng</h2>
          <div className="card p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <FiClock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Thời gian xử lý</p>
                <p className="text-gray-600 text-sm">
                  Yêu cầu hoàn tiền sẽ được xem xét trong vòng 24-48 giờ làm việc. Vui lòng kiên nhẫn chờ đợi.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Phương thức hoàn tiền</p>
                <p className="text-gray-600 text-sm">
                  Tiền sẽ được hoàn về đúng phương thức thanh toán bạn đã sử dụng. Nếu thanh toán bằng chuyển khoản, vui lòng cung cấp thông tin tài khoản ngân hàng.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Bảo vệ khách hàng</p>
                <p className="text-gray-600 text-sm">
                  Chúng tôi cam kết xử lý mọi yêu cầu hoàn tiền một cách công bằng và minh bạch. Mọi quyết định đều dựa trên chính sách và điều kiện đã công bố.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Cần hỗ trợ hoàn tiền?</h2>
          <p className="mb-6 text-primary-100">
            Liên hệ với chúng tôi ngay để được hỗ trợ nhanh chóng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@wifshop.com" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Gửi email
            </a>
            <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

