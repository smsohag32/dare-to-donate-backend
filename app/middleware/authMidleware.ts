import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
   throw new Error("JWT_SECRET is required.");
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
   // Extract token from Authorization header
   const token = req.headers["authorization"]?.split(" ")[1];

   // If no token is provided, return 401 Unauthorized
   if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET); // Assuming decoded contains user information
      req.user = decoded; // Attach decoded information to request object
      next(); // Pass control to the next middleware or route handler
   } catch (error) {
      // If token is invalid, return 400 Bad Request
      res.status(400).json({ message: "Invalid token" });
   }
};
