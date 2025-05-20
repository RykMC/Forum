import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ message: "Kein Token vorhanden" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // enthält z.B. id und username
    next();
  } catch (err) {
    console.error("❌ Ungültiger Token:", err);
    return res.status(401).json({ message: "Ungültiger Token" });
  }
};
