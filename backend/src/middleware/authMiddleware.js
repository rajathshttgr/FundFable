import jwt from "jsonwebtoken";

// Standardized error response
const handleError = (res, status, message) => {
  res.status(status).json({
    status,
    message,
    data: null,
  });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return handleError(res, 401, "No token. Authorization denied.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request for downstream use
    next();
  } catch (error) {
    return handleError(res, 400, "Invalid or expired token.");
  }
};
