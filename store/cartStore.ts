// Zustand store cho giỏ hàng (client-side state management)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

// Interface cho cart store state
interface CartStore {
  items: CartItem[]; // Danh sách items trong giỏ hàng
  addItem: (item: Omit<CartItem, 'quantity'>) => void; // Thêm item vào giỏ hàng
  removeItem: (accountId: string) => void; // Xóa item khỏi giỏ hàng
  updateQuantity: (accountId: string, quantity: number) => void; // Cập nhật số lượng
  clearCart: () => void; // Xóa toàn bộ giỏ hàng
  getTotalPrice: () => number; // Tính tổng tiền
  getTotalItems: () => number; // Tính tổng số items
}

// Tạo cart store với persist middleware (lưu vào localStorage)
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Khởi tạo items rỗng
      items: [],

      // Thêm item vào giỏ hàng
      addItem: (item) => {
        const items = get().items;
        // Kiểm tra nếu item đã tồn tại
        const existingItem = items.find((i) => i.accountId === item.accountId);
        
        if (existingItem) {
          // Tăng số lượng nếu đã có
          set({
            items: items.map((i) =>
              i.accountId === item.accountId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          // Thêm mới với quantity = 1
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      // Xóa item khỏi giỏ hàng
      removeItem: (accountId) => {
        set({
          items: get().items.filter((item) => item.accountId !== accountId),
        });
      },

      // Cập nhật số lượng item
      updateQuantity: (accountId, quantity) => {
        if (quantity <= 0) {
          // Xóa item nếu quantity <= 0
          get().removeItem(accountId);
          return;
        }
        
        set({
          items: get().items.map((item) =>
            item.accountId === accountId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      // Xóa toàn bộ giỏ hàng
      clearCart: () => {
        set({ items: [] });
      },

      // Tính tổng tiền
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Tính tổng số items
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Tên key trong localStorage
    }
  )
);

