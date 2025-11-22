// TypeScript types và interfaces cho toàn bộ application

// Loại game/tài khoản
export type GameType = 'MMORPG' | 'FPS' | 'MOBA' | 'RPG' | 'Strategy' | 'Other';

// Trạng thái tài khoản
export type AccountStatus = 'available' | 'sold' | 'reserved' | 'pending';

// Trạng thái đơn hàng
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

// Phương thức thanh toán
export type PaymentMethod = 'bank_transfer' | 'momo' | 'zalopay' | 'vnpay';

// Role người dùng
export type UserRole = 'user' | 'admin';

// Interface cho tài khoản game
export interface GameAccount {
  _id?: string;
  title: string; // Tên tài khoản
  gameName: string; // Tên game
  gameType: GameType; // Loại game
  description: string; // Mô tả chi tiết
  price: number; // Giá bán
  originalPrice?: number; // Giá gốc (nếu có giảm giá)
  images: string[]; // Danh sách hình ảnh
  level?: number; // Level nhân vật
  rank?: string; // Rank/hạng
  server?: string; // Server
  features: string[]; // Tính năng đặc biệt
  status: AccountStatus; // Trạng thái
  stock: number; // Số lượng còn lại
  soldCount: number; // Số lượng đã bán
  createdAt: Date; // Ngày tạo
  updatedAt: Date; // Ngày cập nhật
}

// Interface cho người dùng
export interface User {
  _id?: string;
  email: string; // Email đăng nhập
  password: string; // Mật khẩu (hashed)
  fullName: string; // Họ tên
  phone?: string; // Số điện thoại
  address?: string; // Địa chỉ
  role: UserRole; // Vai trò
  createdAt: Date; // Ngày tạo
  updatedAt: Date; // Ngày cập nhật
}

// Interface cho đơn hàng
export interface Order {
  _id?: string;
  userId: string | null; // ID người dùng (null nếu không đăng nhập)
  items: OrderItem[]; // Danh sách sản phẩm
  totalAmount: number; // Tổng tiền
  paymentMethod: PaymentMethod; // Phương thức thanh toán
  status: OrderStatus; // Trạng thái đơn hàng
  shippingInfo: ShippingInfo; // Thông tin giao hàng
  notes?: string; // Ghi chú
  createdAt: Date; // Ngày tạo
  updatedAt: Date; // Ngày cập nhật
}

// Interface cho item trong đơn hàng
export interface OrderItem {
  accountId: string; // ID tài khoản
  title: string; // Tên tài khoản
  price: number; // Giá tại thời điểm mua
  quantity: number; // Số lượng
}

// Interface cho thông tin giao hàng
export interface ShippingInfo {
  fullName: string; // Họ tên người nhận
  email: string; // Email
  phone: string; // Số điện thoại
  address?: string; // Địa chỉ
}

// Interface cho giỏ hàng (client-side)
export interface CartItem {
  accountId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

