import { Handlers } from "$fresh/server.ts";
import { Database } from "sqlite3";

export const handler: Handlers = {
  GET(req: Request) {
    const db = new Database("./base.db");

    const url = new URL(req.url);
    const report_monthly_id = url.searchParams.get("report_monthly_id");
    const type = url.searchParams.get("type");
    
    const stms = db.prepare(`
    SELECT 
      date, 
      SUM(CASE WHEN status = 0 THEN cash ELSE -cash END) AS total,
      SUM(CASE WHEN status = 0 THEN cash ELSE 0 END) AS debit, 
      SUM(CASE WHEN status = 1 THEN cash ELSE 0 END) AS credit 
    FROM 
      report_list WHERE report_monthly_id = :report_monthly_id AND type = :type 
    GROUP BY date`);

    const list = stms.all({report_monthly_id: report_monthly_id, type: type});

    const all = db.prepare(`
    SELECT
      SUM(CASE WHEN status = 0 THEN cash ELSE -cash END) AS total,
      SUM(CASE WHEN status = 0 THEN cash ELSE 0 END) AS debit, 
      SUM(CASE WHEN status = 1 THEN cash ELSE 0 END) AS credit
    FROM
      report_list
    WHERE report_monthly_id = :report_monthly_id AND type = :type
    `);

    const calculate = all.get({report_monthly_id: report_monthly_id, type: type});

    return Response.json({
      data: {
        list: list,
        calculate: calculate,
      }
    });
  }
}