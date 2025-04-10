import jwt from "jsonwebtoken";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      handleResponse(res, 401, "No token Autherization denied");
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("the decoded user is: ", decode);
      handleResponse(res, 201, "Token verified successfully", decode);
      next();
    } catch (error) {
      handleResponse(res, 400, "Token is not Valid");
    }
  } else {
    handleResponse(res, 401, "No token Autherization denied");
  }
};
