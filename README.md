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
- **Backend**: Next.js API Routes
- **Database**: MongoDB
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
MONGODB_URI=mongodb://localhost:27017/shop_account_mmo
JWT_SECRET=your-secret-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

3. **Chạy development server:**

```bash
npm run dev
```

4. **Chạy seed data (tạo mockup data):**
   Sau khi server đã chạy, mở trình duyệt và truy cập:

```
http://localhost:3000/api/seed
```

Hoặc dùng curl:

```bash
curl -X POST http://localhost:3000/api/seed
```

5. **Mở trình duyệt:**
   Truy cập [http://localhost:3000](http://localhost:3000)

## Cấu trúc project

```
project_shop_mmo/
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AccountCard.tsx
├── pages/              # Next.js pages và API routes
│   ├── api/           # API endpoints
│   ├── products/      # Trang sản phẩm
│   └── index.tsx      # Trang chủ
├── lib/               # Utilities
│   ├── mongodb.ts     # MongoDB connection
│   └── auth.ts        # Authentication helpers
├── store/             # State management
│   └── cartStore.ts   # Giỏ hàng store
├── types/             # TypeScript types
│   └── index.ts
├── styles/            # Global styles
│   └── globals.css
└── scripts/           # Scripts
    └── seedData.ts    # Seed mockup data
```

## API Endpoints

### Accounts

- `GET /api/accounts` - Lấy danh sách tài khoản
- `GET /api/accounts/[id]` - Lấy chi tiết tài khoản
- `POST /api/accounts` - Tạo tài khoản mới (admin only)
- `PUT /api/accounts/[id]` - Cập nhật tài khoản (admin only)
- `DELETE /api/accounts/[id]` - Xóa tài khoản (admin only)

### Authentication

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Orders

- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới

## Mockup Data

Script seed data sẽ tạo 3 sản phẩm mẫu:

1. **Netflix Premium** - 50,000 VNĐ
2. **Spotify Premium** - 35,000 VNĐ
3. **Gaming Accounts** - 150,000 VNĐ

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
