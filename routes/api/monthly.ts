import { HandlerContext } from "$fresh/server.ts";
import { Database } from "sqlite3";

interface MonthlyInterface {
  month: number;
  year: number;
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const db = new Database("./base.db");

  if (_req.method === "GET") {
    const stmt = db.prepare("SELECT * FROM report_monthly");
    return Response.json(stmt.all());
  }

  if (_req.method === "POST") {
    const data: MonthlyInterface = await _req.json();
    const ins = db.exec("INSERT INTO report_monthly (month, year) VALUES (:month, :year)", {month: data.month, year: data.year});
    return Response.json({
      message: ins > 0 ? "successful to save data" : "failed to save data"
    });
  }
  
  return new Response("Not Found");
};
