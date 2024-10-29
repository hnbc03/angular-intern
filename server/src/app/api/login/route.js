import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "thisisnotasecretkey";
const REFRESH_TOKEN_SECRET = "thisisalsonotasecretkey";

export async function POST(req) {
  const { usernameOrEmail, password } = await req.json();

  // Kiểm tra xem người dùng có tồn tại hay không
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Invalid credentials",
        data: null,
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Invalid credentials",
        data: null,
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Tạo JWT access token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Tạo refresh token
  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Lưu refresh token vào database
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  // Trả về token cho client
  return new Response(
    JSON.stringify({
      code: 200,
      message: "Login successful",
      data: {
        token,
        refreshToken,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
