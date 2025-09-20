import type { IncomingMessage, ServerResponse } from "http";

/** router de /books */
export function enrutarBooks (req: IncomingMessage, res: ServerResponse) {

  const url = req.url;
  const method = req.method;

  switch (method) {
    case "GET": 
      res.setHeader('content-type', 'text/plain');
      res.end("books GET");
      break;
    case "POST":
      res.setHeader('content-type', 'text/plain');
      res.end("books POST");
      break;
  }
}