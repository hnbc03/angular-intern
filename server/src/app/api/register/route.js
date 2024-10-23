import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  // Lấy dữ liệu từ request
  const { email, password, username } = await req.json();

  // Kiểm tra nếu email đã tồn tại
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return new Response(
      JSON.stringify({
        code: 400,
        message: "Email already exists",
        data: null,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Kiểm tra nếu username đã tồn tại
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return new Response(
      JSON.stringify({
        code: 400,
        message: "Username already exists",
        data: null,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Hash mật khẩu trước khi lưu vào database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lưu người dùng mới vào database
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return new Response(
    JSON.stringify({
      code: 201,
      message: "User registered successfully",
      data: { email, username },
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
