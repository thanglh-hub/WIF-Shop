// Component ContactSidebar - Sidebar hiển thị các icon liên lạc đơn giản, cố định
'use client';

import Image from 'next/image';

// Interface cho các kênh liên lạc
interface ContactChannel {
  name: string; // Tên kênh liên lạc
  icon: string; // Đường dẫn đến icon
  url: string; // URL liên kết
}

export default function ContactSidebar() {
  // Danh sách các kênh liên lạc
  const contactChannels: ContactChannel[] = [
    {
      name: 'Facebook',
      icon: '/images/fb.png', // Đường dẫn đến icon Facebook
      url: 'https://www.facebook.com', // URL Facebook (có thể thay đổi)
    },
    {
      name: 'Zalo',
      icon: '/images/zl.png', // Đường dẫn đến icon Zalo
      url: 'https://zalo.me', // URL Zalo (có thể thay đổi)
    },
    {
      name: 'Telegram',
      icon: '/images/tele.png', // Đường dẫn đến icon Telegram
      url: 'https://t.me', // URL Telegram (có thể thay đổi)
    },
  ];

  // Xử lý khi click vào icon liên lạc
  const handleContactClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn hành vi mặc định
    window.open(url, '_blank', 'noopener,noreferrer'); // Mở link trong tab mới
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3 px-2">
      {contactChannels.map((channel) => (
        <a
          key={channel.name}
          href={channel.url}
          onClick={(e) => handleContactClick(channel.url, e)}
          className="group relative w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-gray-200"
          aria-label={`Liên hệ qua ${channel.name}`}
          title={channel.name}
        >
          {/* Icon của kênh liên lạc */}
          <div className="relative w-7 h-7">
            <Image
              src={channel.icon}
              alt={channel.name}
              fill
              className="object-contain"
              sizes="28px"
            />
          </div>
        </a>
      ))}
    </div>
  );
}
