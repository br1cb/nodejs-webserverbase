import type { ParsedBody } from "../middlewares/routes-middleware.js";

export type RouteExtras<T> = { 
  body?: any; 
  parsedBody?: T; 
} | null;