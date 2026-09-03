import type { Request, Response } from 'express';

export function createMessage(name: string): string {
  return `Hello ${name}`;
}

export function handleRequest(req: Request, res: Response): void {
  const name: string = String(req.query.name ?? 'User');

  res.json({
    message: createMessage(name)
  });
}

export function solve_07_express_ts_migration_workflow(): string {
  return createMessage('TypeScript');
}