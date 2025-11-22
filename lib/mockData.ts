// Mock data cho frontend development
import { GameAccount, Order, User } from '@/types';

// Mock accounts data
export const mockAccounts: GameAccount[] = [
  {
    _id: '1',
    title: 'Tài khoản Genshin Impact AR 60',
    gameName: 'Genshin Impact',
    gameType: 'RPG',
    description: 'Tài khoản Genshin Impact cấp độ cao với nhiều nhân vật 5 sao',
    price: 500000,
    originalPrice: 600000,
    images: ['/images/genshin-1.jpg'],
    level: 60,
    rank: 'AR 60',
    server: 'Asia',
    features: ['5 nhân vật 5 sao', 'Nhiều vũ khí 5 sao', 'Đã hoàn thành story'],
    status: 'available',
    stock: 5,
    soldCount: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Tài khoản Valorant Rank Diamond',
    gameName: 'Valorant',
    gameType: 'FPS',
    description: 'Tài khoản Valorant rank Diamond với nhiều skin đẹp',
    price: 800000,
    images: ['/images/valorant-1.jpg'],
    rank: 'Diamond',
    features: ['Rank Diamond', 'Nhiều skin premium', 'Đầy đủ agent'],
    status: 'available',
    stock: 3,
    soldCount: 7,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20')
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    _id: 'order1',
    userId: 'user1',
    items: [
      {
        accountId: '1',
        title: 'Tài khoản Genshin Impact AR 60',
        price: 500000,
        quantity: 1
      }
    ],
    totalAmount: 500000,
    paymentMethod: 'bank_transfer',
    status: 'completed',
    shippingInfo: {
      fullName: 'Nguyễn Văn A',
      email: 'test@example.com',
      phone: '0123456789'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
];

// Mock users data
export const mockUsers: User[] = [
  {
    _id: 'user1',
    email: 'admin@example.com',
    password: 'hashed_password',
    fullName: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

