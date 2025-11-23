# Shop Account MMO - Website Bán Tài Khoản Game

Website bán tài khoản game hiện đại, trực quan với giao diện đẹp mắt và dễ sử dụng.

## Tính năng

- 🎮 Quản lý tài khoản game (CRUD)
- 🛒 Giỏ hàng và thanh toán
- 👤 Xác thực người dùng (Đăng nhập)
- 📱 Responsive design
- 🎨 Giao diện hiện đại với Tailwind CSS
- 🔍 Tìm kiếm và lọc sản phẩm

## Công nghệ sử dụng

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Icons**: React Icons

## Cài đặt

1. **Clone repository và cài đặt dependencies:**

```bash
npm install
```

2. **Cấu hình environment variables:**
   Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. **Chạy development server:**

```bash
npm run dev
```

4. **Mở trình duyệt:**
   Truy cập [http://localhost:3000](http://localhost:3000)

## Cấu trúc project

```
project_shop_mmo/
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AccountCard.tsx
├── pages/              # Next.js pages
│   ├── products/      # Trang sản phẩm
│   └── index.tsx      # Trang chủ
├── lib/               # Utilities
│   └── auth.ts        # Authentication helpers
├── store/             # State management
│   └── cartStore.ts   # Giỏ hàng store
├── types/             # TypeScript types
│   └── index.ts
└── styles/            # Global styles
    └── globals.css
```

## Development

```bash
# Development mode
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT
