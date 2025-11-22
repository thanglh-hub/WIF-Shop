// Trang Điều khoản sử dụng
'use client';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Điều khoản sử dụng</h1>
          <p className="text-gray-600">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Chấp nhận điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                Bằng việc truy cập và sử dụng website WIF Shop, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Định nghĩa</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>"Website"</strong> đề cập đến WIF Shop và tất cả các trang con của nó.</li>
                <li><strong>"Chúng tôi", "Của chúng tôi", "WIF Shop"</strong> đề cập đến chủ sở hữu và người vận hành website.</li>
                <li><strong>"Bạn", "Người dùng", "Khách hàng"</strong> đề cập đến cá nhân hoặc tổ chức truy cập và sử dụng website.</li>
                <li><strong>"Sản phẩm"</strong> đề cập đến các tài khoản game được bán trên website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Sử dụng dịch vụ</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Bạn đồng ý sử dụng dịch vụ của chúng tôi một cách hợp pháp và phù hợp với các điều khoản này. Bạn không được:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Sử dụng dịch vụ cho mục đích bất hợp pháp hoặc trái pháp luật</li>
                <li>Vi phạm bất kỳ quyền sở hữu trí tuệ nào</li>
                <li>Gây rối, làm gián đoạn hoặc can thiệp vào hoạt động của website</li>
                <li>Thử nghiệm, quét lỗ hổng bảo mật hoặc tấn công hệ thống</li>
                <li>Sử dụng bot, script hoặc công cụ tự động để truy cập website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Mua hàng và thanh toán</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Khi mua sản phẩm trên website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi đặt hàng</li>
                <li>Bạn chịu trách nhiệm về tính chính xác của thông tin thanh toán</li>
                <li>Giá sản phẩm có thể thay đổi mà không cần thông báo trước</li>
                <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng bất cứ lúc nào</li>
                <li>Tất cả giao dịch đều được xử lý an toàn và bảo mật</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Quyền sở hữu tài khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                Sau khi thanh toán thành công và nhận tài khoản, bạn có quyền sở hữu và sử dụng tài khoản đó. Tuy nhiên, bạn phải tuân thủ các điều khoản sử dụng của nhà phát hành game. Chúng tôi không chịu trách nhiệm nếu bạn vi phạm điều khoản của nhà phát hành.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Bảo mật thông tin</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách Bảo mật. Tuy nhiên, bạn cũng có trách nhiệm bảo mật thông tin đăng nhập và không chia sẻ với bên thứ ba.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Miễn trừ trách nhiệm</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi không chịu trách nhiệm cho:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ</li>
                <li>Mất mát dữ liệu, lợi nhuận hoặc cơ hội kinh doanh</li>
                <li>Hành vi của nhà phát hành game hoặc bên thứ ba</li>
                <li>Gián đoạn dịch vụ do lỗi kỹ thuật hoặc bảo trì</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Thay đổi điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền thay đổi, sửa đổi hoặc cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay sau khi được đăng tải trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là bạn đã chấp nhận các điều khoản mới.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Liên hệ</h2>
              <p className="text-gray-700 leading-relaxed">
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua email: support@wifshop.com hoặc hotline: 1900 1234.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

