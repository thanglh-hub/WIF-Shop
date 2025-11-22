// API route: POST /api/orders - Tạo đơn hàng mới (Mock data)
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockAccounts } from '@/lib/mockData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { items, shippingInfo, paymentMethod, notes, userId } = req.body;

    // Validate
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống'
      });
    }

    if (!shippingInfo || !shippingInfo.email || !shippingInfo.fullName || !shippingInfo.phone) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin giao hàng'
      });
    }

    // Validate và tính tổng tiền
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const account = mockAccounts.find(acc => acc._id === item.accountId);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy tài khoản: ${item.title}`
        });
      }

      if (account.status !== 'available' || account.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Tài khoản ${item.title} không còn hàng hoặc không khả dụng`
        });
      }

      totalAmount += account.price * item.quantity;
      validatedItems.push({
        accountId: account._id!,
        title: account.title,
        price: account.price,
        quantity: item.quantity
      });
    }

    // Mock: Generate order ID
    const orderId = `order_${Date.now()}`;

    // Mock order
    const newOrder = {
      _id: orderId,
      userId: userId || shippingInfo.email,
      items: validatedItems,
      totalAmount,
      paymentMethod: paymentMethod || 'bank_transfer',
      shippingInfo,
      notes: notes || '',
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      data: newOrder
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message
    });
  }
}
