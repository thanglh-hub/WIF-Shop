// Xử lý authentication và authorization
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextApiRequest } from 'next';

// Interface cho JWT payload
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

// JWT secret key từ environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

/**
 * Hash password sử dụng bcrypt
 * @param password - Mật khẩu cần hash
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Hash password với salt rounds = 12
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

/**
 * So sánh password với hashed password
 * @param password - Mật khẩu gốc
 * @param hashedPassword - Hashed password để so sánh
 * @returns Promise<boolean> - True nếu khớp, false nếu không
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  // So sánh password với hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

/**
 * Tạo JWT token
 * @param payload - JWT payload chứa thông tin user
 * @returns string - JWT token
 */
export function generateToken(payload: JWTPayload): string {
  // Tạo token với thời gian hết hạn 7 ngày
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

/**
 * Verify và decode JWT token
 * @param token - JWT token cần verify
 * @returns JWTPayload | null - Decoded payload hoặc null nếu invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    // Verify token và decode payload
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    // Token invalid hoặc expired
    return null;
  }
}

/**
 * Lấy user từ request headers (Authorization token)
 * @param req - Next.js API request
 * @returns JWTPayload | null - User payload hoặc null nếu không có token
 */
export function getUserFromRequest(req: NextApiRequest): JWTPayload | null {
  // Lấy Authorization header
  const authHeader = req.headers.authorization;
  
  // Kiểm tra nếu không có header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // Extract token từ header
  const token = authHeader.substring(7);
  
  // Verify và decode token
  const user = verifyToken(token);
  return user;
}

