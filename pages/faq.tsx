// Trang Câu hỏi thường gặp (FAQ)
'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Làm thế nào để mua tài khoản?',
    answer: 'Bạn chỉ cần chọn sản phẩm muốn mua, click "Mua ngay", điền thông tin và thanh toán. Sau khi thanh toán thành công, chúng tôi sẽ gửi thông tin tài khoản đến email của bạn trong vòng 5-60 phút.'
  },
  {
    question: 'Tài khoản có chính chủ không?',
    answer: 'Tất cả tài khoản chúng tôi cung cấp đều là tài khoản chính chủ, được đăng ký hợp pháp. Chúng tôi cam kết không bán tài khoản hack, crack hoặc tài khoản vi phạm điều khoản dịch vụ.'
  },
  {
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Sau khi thanh toán thành công, chúng tôi sẽ gửi thông tin tài khoản đến email của bạn trong vòng 5-60 phút. Trong trường hợp đặc biệt, thời gian có thể kéo dài đến 2 giờ.'
  },
  {
    question: 'Tôi có thể đổi mật khẩu tài khoản không?',
    answer: 'Có, bạn hoàn toàn có thể đổi mật khẩu sau khi nhận tài khoản. Chúng tôi khuyến khích bạn đổi mật khẩu ngay sau khi nhận để bảo mật tài khoản tốt hơn.'
  },
  {
    question: 'Chính sách hoàn tiền như thế nào?',
    answer: 'Chúng tôi hỗ trợ hoàn tiền trong vòng 7 ngày kể từ ngày mua nếu tài khoản có vấn đề hoặc không đúng như mô tả. Vui lòng liên hệ với chúng tôi qua email hoặc hotline để được hỗ trợ.'
  },
  {
    question: 'Tài khoản có bị khóa không?',
    answer: 'Tất cả tài khoản đều được đảm bảo không bị khóa. Nếu tài khoản bị khóa trong vòng 30 ngày kể từ ngày mua, chúng tôi sẽ hỗ trợ đổi tài khoản mới hoặc hoàn tiền.'
  },
  {
    question: 'Tôi có thể mua nhiều tài khoản cùng lúc không?',
    answer: 'Có, bạn có thể mua nhiều tài khoản cùng lúc. Mỗi tài khoản sẽ được gửi đến email riêng biệt mà bạn cung cấp.'
  },
  {
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer: 'Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, ví MoMo, ZaloPay và các ví điện tử khác. Tất cả giao dịch đều được bảo mật và an toàn.'
  },
  {
    question: 'Làm sao để tra cứu đơn hàng?',
    answer: 'Bạn có thể tra cứu đơn hàng bằng cách vào trang "Tra cứu đơn hàng", nhập mã đơn hàng và email đã sử dụng khi đặt hàng. Hệ thống sẽ hiển thị thông tin chi tiết đơn hàng của bạn.'
  },
  {
    question: 'Tôi có thể liên hệ hỗ trợ như thế nào?',
    answer: 'Bạn có thể liên hệ với chúng tôi qua email support@wifshop.com, hotline 1900 1234 hoặc chat trực tiếp trên website. Chúng tôi hỗ trợ 24/7.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // State cho câu hỏi đang mở

  // Toggle câu hỏi
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Câu hỏi thường gặp</h1>
          <p className="text-gray-600 text-lg">
            Tìm câu trả lời cho các thắc mắc của bạn
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 card p-6 bg-primary-50 border border-primary-200">
          <h2 className="text-xl font-bold mb-2">Không tìm thấy câu trả lời?</h2>
          <p className="text-gray-600 mb-4">
            Nếu bạn vẫn còn thắc mắc, đừng ngần ngại liên hệ với chúng tôi.
          </p>
          <a href="/contact" className="btn btn-primary">
            Liên hệ hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}

