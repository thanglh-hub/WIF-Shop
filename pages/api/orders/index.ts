// API route: POST /api/orders - Tạo đơn hàng mới
import type { NextApiRequest, NextApiResponse } from 'next';

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

    // TODO: Kết nối với backend API để validate và tạo đơn hàng
    // Validate và tính tổng tiền
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      // TODO: Gọi API backend để lấy thông tin account
      // const account = await fetchAccountFromBackend(item.accountId);
      
      // Tạm thời sử dụng dữ liệu từ request
      totalAmount += item.price * item.quantity;
      validatedItems.push({
        accountId: item.accountId,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      });
    }

    // TODO: Generate order ID từ backend
    const orderId = `order_${Date.now()}`;

    // TODO: Lưu order vào backend database
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
