import jwt from 'jsonwebtoken';

const JWT_SECRET = 'thisisnotasecretkey';

export const verifyToken = (req) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({
      code: 403,
      message: 'Access denied',
    }), { status: 403 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return new Response(JSON.stringify({
      code: 403,
      message: 'Invalid or expired token',
    }), { status: 403 });
  }
};
