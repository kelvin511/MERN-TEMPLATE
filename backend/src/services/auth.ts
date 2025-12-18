import jwt from "jsonwebtoken";

function generateTokens(userId: string):{ accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

function refreshTokens(refreshToken: string): { accessToken: string; refreshToken: string } | null {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: string };
    return generateTokens(payload.userId);
  } catch (err) {
    return null;
  }
}

function verifyAccessToken(accessToken: string): { userId: string } | null {
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as { userId: string };
    return payload;
  } catch (err) {
    return null; 
  }
}

export { generateTokens , refreshTokens,verifyAccessToken };