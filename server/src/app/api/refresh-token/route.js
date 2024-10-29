import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "thisisnotasecretkey";
const REFRESH_TOKEN_SECRET = "thisisalsonotasecretkey";

export async function POST(req) {
  const { refreshToken } = await req.json();

  // Kiểm tra refresh token có tồn tại trong database không
  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        code: 403,
        message: "Invalid refresh token",
        data: null,
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Tạo access token mới
  const newToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Trả về token mới cho client
  return new Response(
    JSON.stringify({
      code: 200,
      message: "Token refreshed successfully",
      accessToken: newToken,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
