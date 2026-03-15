import type { ParsedBody } from "../middlewares/routes-middleware.js";
import { IncomingMessage, ServerResponse } from 'node:http';

export type RouteExtras<T> = { 
  body?: any; 
  parsedBody?: T; 
} | null;

export interface RouteHandler<T = any> {
  (req: IncomingMessage, res: ServerResponse, extras?: RouteExtras<T>): void;
}
