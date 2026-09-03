import type { Request, Response, NextFunction } from "express";

function handler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.send("Request handled");
}

export function solve_05_typed_express_request_response(): string {
  return "Express handler typed successfully";
}