// Trang Chính sách bảo mật
'use client';

import { FiShield, FiLock, FiEye, FiUser } from 'react-icons/fi';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Chính sách bảo mật</h1>
          <p className="text-gray-600">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <FiUser className="w-6 h-6" />
                <span>1. Thông tin chúng tôi thu thập</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi thu thập các loại thông tin sau đây:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Thông tin cá nhân:</strong> Họ tên, email, số điện thoại, địa chỉ khi bạn đặt hàng</li>
                <li><strong>Thông tin thanh toán:</strong> Phương thức thanh toán, thông tin giao dịch (được mã hóa và bảo mật)</li>
                <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thiết bị truy cập, cookie</li>
                <li><strong>Thông tin sử dụng:</strong> Các trang bạn truy cập, thời gian truy cập, hành vi duyệt web</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <FiEye className="w-6 h-6" />
                <span>2. Cách chúng tôi sử dụng thông tin</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi sử dụng thông tin thu thập được để:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Xử lý và hoàn thành đơn hàng của bạn</li>
                <li>Gửi thông tin tài khoản và cập nhật đơn hàng</li>
                <li>Cải thiện dịch vụ và trải nghiệm người dùng</li>
                <li>Gửi thông tin khuyến mãi, quảng cáo (nếu bạn đồng ý)</li>
                <li>Phòng chống gian lận và bảo mật website</li>
                <li>Tuân thủ các yêu cầu pháp lý</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <FiLock className="w-6 h-6" />
                <span>3. Bảo mật thông tin</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của bạn:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Mã hóa SSL/TLS cho tất cả giao dịch</li>
                <li>Lưu trữ dữ liệu trên server an toàn với firewall và bảo mật nhiều lớp</li>
                <li>Không lưu trữ thông tin thẻ tín dụng (xử lý qua cổng thanh toán bên thứ ba)</li>
                <li>Giới hạn quyền truy cập thông tin chỉ cho nhân viên cần thiết</li>
                <li>Thường xuyên kiểm tra và cập nhật hệ thống bảo mật</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Chia sẻ thông tin</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nhà cung cấp dịch vụ thanh toán (để xử lý giao dịch)</li>
                <li>Đối tác vận chuyển (nếu có)</li>
                <li>Khi được yêu cầu bởi pháp luật hoặc cơ quan nhà nước có thẩm quyền</li>
                <li>Để bảo vệ quyền lợi, tài sản hoặc an toàn của chúng tôi và người dùng khác</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cookie và công nghệ theo dõi</h2>
              <p className="text-gray-700 leading-relaxed">
                Website sử dụng cookie để cải thiện trải nghiệm người dùng, phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến chức năng của website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Quyền của bạn</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Bạn có quyền:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Truy cập và xem thông tin cá nhân của mình</li>
                <li>Yêu cầu sửa đổi hoặc xóa thông tin không chính xác</li>
                <li>Yêu cầu xóa tài khoản và dữ liệu cá nhân</li>
                <li>Từ chối nhận email marketing (unsubscribe)</li>
                <li>Khiếu nại về việc xử lý dữ liệu cá nhân</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Bảo lưu dữ liệu</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi lưu trữ thông tin của bạn trong thời gian cần thiết để cung cấp dịch vụ và tuân thủ các nghĩa vụ pháp lý. Sau khi bạn yêu cầu xóa tài khoản, chúng tôi sẽ xóa thông tin trong vòng 30 ngày, trừ những thông tin phải lưu trữ theo quy định pháp luật.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Thay đổi chính sách</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là bạn đã chấp nhận chính sách mới.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Liên hệ</h2>
              <p className="text-gray-700 leading-relaxed">
                Nếu bạn có câu hỏi hoặc yêu cầu về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-2">WIF Shop</p>
                <p className="text-gray-700">Email: privacy@wifshop.com</p>
                <p className="text-gray-700">Hotline: 1900 1234</p>
                <p className="text-gray-700">Thời gian làm việc: 8:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

