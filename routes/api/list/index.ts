import { HandlerContext } from "$fresh/server.ts";
import { Database } from "sqlite3";

interface ReportList {
  date: number;
  report_monthly_id: number;
  desc: string;
  status: number;
  cash: number;
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  // const db = new Database("./base.db");
  
  return new Response("Not Found");
};
