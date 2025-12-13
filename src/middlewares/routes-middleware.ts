import type { IncomingMessage, ServerResponse } from "http";
import type { RouteExtras } from "../interfaces/routes-interfaces.js";

//middleware
export type ParsedBody<T> = T;
export function getAndJsonParseBody(req: IncomingMessage, res: ServerResponse, callback: (req: IncomingMessage, res: ServerResponse, extras?: RouteExtras<any>) => void) {
  if (req.method === "POST") {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      // Parse the body if it's JSON
      let jsonData: ParsedBody<any> = null;
      try {
        jsonData = JSON.parse(body);
        console.log(jsonData); // Access specific data from the body
      } catch (err) {
        console.error('Error parsing body:', err);
      }

      callback(req, res, { body, parsedBody: jsonData });
    });
  } else {
    callback(req, res);
  }
}